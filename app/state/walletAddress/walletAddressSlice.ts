import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  EntityId,
  createAsyncThunk,
  Update,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import serveraxios from "@/app/config/ServerAxios";
import { fetchAndUpdateUser } from "../user/userSlice";
import { walletLogin } from "../authSlice";
import { disconnect } from "@wagmi/core";

export interface WalletAddress {
  id: EntityId;
  walletAddress: string;
  name: string;
}

export interface WalletAddressModel {
  _id: string;
  user: string;
  name: string;
  walletAddress: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface AddWalletAddressSuccess {
  message: string;
  walletAddress: {
    _id: string;
    user: string;
    name: string;
    walletAddress: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
}

export interface requestError {
  status: number;
  message: string;
}

const walletAddressAdapter = createEntityAdapter<WalletAddress>();

const initialState = walletAddressAdapter.getInitialState();

export const addWalletAddress = createAsyncThunk<
  WalletAddress,
  {walletAddress: string},
  {
    rejectValue: requestError;
  }
>(
  "walletAddresses/addWalletAddress",
  async ({walletAddress}, thunkAPI: any) => {
    try {
      const state: any = thunkAPI.getState();
      const { data: resData } = await serveraxios.post<AddWalletAddressSuccess>(
        "/api/walletAddress",
        { walletAddress },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.auth.auth.accessToken}`,
          },
        }
      );
      const payload = {
        id: resData.walletAddress._id,
        walletAddress: resData.walletAddress.walletAddress,
      };
      disconnect();
      return payload;
    } catch (error: any) {
      disconnect();
      return thunkAPI.rejectWithValue({
        status: error.response.data.status,
        message: error.response.data.message,
      });
    }
  }
);

export const editWalletAddress = createAsyncThunk<
  Update<WalletAddress>,
  WalletAddress,
  { rejectValue: requestError }
>(
  "walletAddresses/editWalletAddress",
  async (existingWalletAddress: WalletAddress, thunkAPI: any) => {
    try {
      const state: any = thunkAPI.getState();
      const { name, id } = existingWalletAddress;
      await serveraxios.post(
        `/api/walletAddress/${id}`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.auth.auth.accessToken}`,
          },
        }
      );
      const payload = { id, name };
      console.log(payload);
      console.log("Auth: ", state.auth.auth.accessToken);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.data.status,
        message: error.response.data.message,
      });
    }
  }
);

export const deleteWalletAddress = createAsyncThunk<
  WalletAddress,
  EntityId,
  { rejectValue: requestError }
>(
  "walletAddresses/deleteWalletAddress",
  async (id: EntityId, thunkAPI: any) => {
    try {
      const state: any = thunkAPI.getState();
      const res = await serveraxios.delete(`/api/walletAddress/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.auth.accessToken}`,
        },
      });
      return { id };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error.response.data.status,
        mesage: error.response.data.mesage,
      });
    }
  }
);

export const walletAddressSlice = createSlice({
    name: "walletAddresses",
    initialState,
    reducers: {
        walletAddressEdited(state, action: PayloadAction<WalletAddress>) {
            walletAddressAdapter.setOne(state, action.payload)
        },
        walletAddressDeleted(state, action: PayloadAction<EntityId>) {
            walletAddressAdapter.removeOne(state, action.payload)
        },
    },
    extraReducers: (builder) => {
        builder 
            // .addCase(walletLogin.fulfilled, (state, action) => walletAddressAdapter.setAll(state, action.payload.user.walletAddresses))
            .addCase(fetchAndUpdateUser.fulfilled, (state, action) => walletAddressAdapter.setAll(state, action.payload.user.walletAddresses))
            .addCase(addWalletAddress.fulfilled, walletAddressAdapter.addOne)
            .addCase(deleteWalletAddress.fulfilled, (state, action) => walletAddressAdapter.removeOne(state, action.payload.id))
            .addCase(editWalletAddress.fulfilled, (state, action) => {
                console.log(action.payload)
                walletAddressAdapter.updateOne(state, action.payload)
            })
    }
});

export const {
    selectAll: selectAllWalletAddresses,
    selectById: selectWalletAddressById,
    selectIds: selectWalletAddressIds,
} = walletAddressAdapter.getSelectors<RootState>((state) => state.walletAddresses)
export default walletAddressSlice.reducer;
