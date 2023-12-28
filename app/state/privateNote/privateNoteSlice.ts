import { createSlice, PayloadAction, createEntityAdapter, EntityId, createAsyncThunk, Update } from "@reduxjs/toolkit";
import { RootState } from "../store";
import serveraxios from "@/app/config/ServerAxios";
import { walletLogin } from "../authSlice";
import { fetchAndUpdateUser } from "../user/userSlice";

export interface PrivateNote {
    id: EntityId
    content: string
}

export interface PrivateNoteModel {
    _id: string
    user: string
    content: string
    createdAt: string
    updatedAt: string
    __v: number
    id: string
}

export interface AddNoteSuccess {
    message: string
    note: {
        _id: string
        user: string
        content: string
        createdAt: string
        updatedAt: string
        __v: number
        id: string
    }
}

export interface requestError {
    status: number
    message: string
}

const privateNotesAdapter = createEntityAdapter<PrivateNote>()

const initialState = privateNotesAdapter.getInitialState()

export const addNote = createAsyncThunk<
    PrivateNote,
    string,
    {
        rejectValue: requestError
    }
>("privateNotes/addNote", async (content: string, thunkAPI: any) => {
    try {
        const state: any = thunkAPI.getState()
        const { data: resData } = await serveraxios.post<AddNoteSuccess>(
            "/api/note",
            { content },
            {
                // withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${state.auth.auth.accessToken}`
                }
            }
        );
        const payload = { id: resData.note._id, content: resData.note.content }
        return payload;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({
            status: error.response.data.status,
            message: error.response.data.message,
        });
    }
});

export const editNote = createAsyncThunk<
    Update<PrivateNote>,
    PrivateNote,
    {
        rejectValue: requestError
    }
>("privateNotes/editNote", async (existingNote: PrivateNote, thunkAPI: any) => {
    try {
        const state: any = thunkAPI.getState()
        const { content, id } = existingNote;
        //config, data, headers, request, status, statusText
        await serveraxios.post(
            `/api/note/${id}`,
            { content },
            {
                // withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${state.auth.auth.accessToken}`
                }
            }
        );
        const payload = { id, content }
        return payload
    } catch (error: any) {
        return thunkAPI.rejectWithValue({
            status: error.response.data.status,
            message: error.response.data.message,
        });
    }
});

export const deleteNote = createAsyncThunk<
    PrivateNote,
    EntityId,
    {
        rejectValue: requestError
    }
>("privateNotes/deleteNote", async (id: EntityId, thunkAPI: any) => {
    try {
        const state: any = thunkAPI.getState()
        const res = await serveraxios.delete(
            `/api/note/${id}`,
            {
                // withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${state.auth.auth.accessToken}`
                }
            }
        );
        // console.log(res)
        return { id }
    } catch (error: any) {
        return thunkAPI.rejectWithValue({
            status: error.response.data.status,
            message: error.response.data.message,
        });
    }
});

export const privateNotesSlice = createSlice({
    name: "privateNotes",
    initialState,
    reducers: {
        noteEdited(state, action: PayloadAction<{ id: EntityId, content: string }>) {
            privateNotesAdapter.setOne(state, action.payload)
        },
        noteDeleted(state, action: PayloadAction<EntityId>) {
            privateNotesAdapter.removeOne(state, action.payload)
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(walletLogin.fulfilled, (state, action) => privateNotesAdapter.setAll(state, action.payload.user.notes))
            .addCase(fetchAndUpdateUser.fulfilled, (state, action) => privateNotesAdapter.setAll(state, action.payload.user.notes))
            .addCase(addNote.fulfilled, privateNotesAdapter.addOne)
            .addCase(deleteNote.fulfilled, (state, action) => privateNotesAdapter.removeOne(state, action.payload.id))
            .addCase(editNote.fulfilled, (state, action) => {
                console.log(action.payload)
                privateNotesAdapter.updateOne(state, action.payload)
            })
    }
});

export const {
    selectAll: selectAllPrivateNotes,
    selectById: selectPrivateNoteById,
    selectIds: selectPrivateNoteIds,
} = privateNotesAdapter.getSelectors<RootState>((state) => state.privateNotes)
export default privateNotesSlice.reducer;