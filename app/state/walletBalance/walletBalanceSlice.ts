import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import serveraxios from "@/app/config/ServerAxios";
import { disconnect } from "@wagmi/core";
import { fetchUserBalance } from "@/app/utils/WalletBalanceMulticall";

export interface TokenBalances {
    tokenSymbol: string;
    tokenBalance: number;
  }
  
  export interface TokenBalancesWithValue {
    tokenSymbol: string;
    tokenBalance: number;
    tokenValue: number;
  }
  
  export interface TokenBalancesState {
    tokenBalances: TokenBalances[] | null;
  }
  
  const initialState: TokenBalancesState = {
    tokenBalances: null,
  };

  export const fetchTokenBalances = createAsyncThunk("updater/updateTokenBalances", async(_, thunkAPI) => {
    // const state: any = thunkAPI.getState();
    const walletAddress = typeof window !== "undefined" ? window.localStorage.getItem("walletAddress"): null;
    
    if (walletAddress) { 
        const userBalance = await fetchUserBalance(walletAddress);
        if (userBalance) {
            console.log("Updating?")
            thunkAPI.dispatch(updateTokenBalances(userBalance))
        }
    }
  })

  export const walletBalanceSlice = createSlice({
    name: "walletBalances",
    initialState,
    reducers: {
        clearTokenBalances: (state) => {
            state.tokenBalances = null
        },
        updateTokenBalances: (state, action) => {
            console.log("Updating token balances", action.payload)
            state.tokenBalances = action.payload
        }
    }
  })

export const selectWalletBalances = (state: RootState) => state.walletBalances.tokenBalances;
export const { clearTokenBalances, updateTokenBalances } = walletBalanceSlice.actions;
export default walletBalanceSlice.reducer;