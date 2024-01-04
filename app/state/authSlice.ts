import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "./user/userSlice";
import serveraxios from "../config/ServerAxios";
import { disconnect } from "@wagmi/core";

export interface LoginSuccess {
    message: string;
    user: UserInterface
    accessToken: string
}

type LoginError = {
    status: number;
    message: string;
}

export interface AuthInterface {
    loading: boolean;
    accessToken: "fetching" | string | null;
    error: LoginError | null;
    success: boolean;
}

export interface AuthState {
    auth: AuthInterface;
}

const initialState: AuthState = {
    auth: {
        loading: false,
        accessToken: "fetching",
        error: null,
        success: false,
    }
}

export const walletLogin = createAsyncThunk("auth/walletlogin", async (walletAddress:string, thunkAPI: any) => {
    try {
        const response = await serveraxios.post<LoginSuccess>(
            "/api/walletlogin",
            {
                walletAddress
            },
            {
                withCredentials: true
            }
        );
        return response.data
    }
    catch (error: any) {
        return thunkAPI.rejectWithValue({
            status: error.response.data.status,
            message: error.response.data.message,
        });
    }
});

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        try {
            const res = await serveraxios.post(
                "/api/logout",
                undefined,
                {
                    withCredentials: true
                }
            );
        } catch (error) {
            return error
        }

    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.auth.accessToken = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.fulfilled, (state, action) => {
                state.auth = { ...initialState.auth, accessToken: null }
            })
            .addCase(walletLogin.fulfilled, (state, action) => {
                state.auth.loading = false;
                state.auth.accessToken = action.payload.accessToken;
                state.auth.success = true;
                disconnect();
            })
    }
});

export const selectAuth = (state: RootState) => state.auth.auth;
export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;