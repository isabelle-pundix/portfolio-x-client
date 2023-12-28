"use client"

import { DelegationsAveragePriceInfo } from "@/app/utils/Delegations";
import { PrivateNoteModel, requestError } from "../privateNote/privateNoteSlice";
import { WalletAddressModel } from "../walletAddress/walletAddressSlice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "../authSlice";
import { RootState } from "../store";
import serveraxios from "@/app/config/ServerAxios";

export interface UserInterface {
    _id: string | null
    walletAddresses: WalletAddressModel[]
    // walletAddress: string | null
    notes: PrivateNoteModel[]
    seq: number | null
    delegationsAveragePriceInfo?: DelegationsAveragePriceInfo
}

export interface UserState {
    user: UserInterface
}

export interface UpdateSuccess {
    message: string
    user: UserInterface
}

const initialState: UserState = {
    user: {
        _id: null,
        walletAddresses: [],
        // walletAddress: null,
        notes: [],
        seq: null,
    },
}

export const fetchAndUpdateUser = createAsyncThunk("user/fetchAndUpdateUser", async (_, thunkAPI) => {
    const state: any = thunkAPI.getState()
    const { data: data } = await serveraxios.get(
        "/api/user",
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.auth.auth.accessToken}`
            }
        }
    );
    console.log(data);
    if (data) {
        thunkAPI.dispatch(setUser(data.user))
    }
    return data
});

export const editUserInfo = createAsyncThunk<
    UpdateSuccess,
    Partial<UserInterface>,
    {
        rejectValue: requestError
    }
>("user/editUserInfo", async (fieldToEdit: Partial<UserInterface>, thunkAPI) => {
    try {
        const state: any = thunkAPI.getState()
        const res = await serveraxios.put(
            `/api/user/${state.user.user._id}`,
            { fieldToEdit },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${state.auth.auth.accessToken}`
                }
            }
        );
        if (res.status === 200) thunkAPI.dispatch(setUser(res.data.user))
        return res.data.user
    } catch (error: any) {
        return thunkAPI.rejectWithValue({
            status: error.response.data.status,
            message: error.response.data.message,
        });
    }

});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = { ...state.user, ...action.payload }
        },
        removeUser: () => {
            return initialState;
        },
        // setWalletAddress: (state, action) => {
        //     // state.user.walletAddress = action.payload;
        //     console.log("Action payload", action.payload)
        //     if (action.payload != null) {
        //         localStorage.setItem('walletAddress', action.payload)
        //     }
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.fulfilled, (state, action) => {
                // localStorage.removeItem('walletAddress');
                state.user = {... initialState.user};
            })
    }
});

export const selectUser = (state: RootState) => state.user.user;
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;