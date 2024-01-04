import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTokenPrices } from "@/app/utils/Token";
import { Constants } from "@/app/constants";
import { RootState } from "../store";

export interface TokenPrice {
  name: string;
  symbol: string;
  priceUSD: number;
  lastUpdated: string;
}

export interface PricesState {
  tokenPrices: TokenPrice[] | null;
}

const initialState: PricesState = {
  tokenPrices: null,
};

export const fetchPrices = createAsyncThunk(
  "updater/fetchPrices",
  async (_, thunkAPI) => {
    const currenciesArr: string[] = Object.keys(
      Constants.Tokens.SupportedTokenSymbols
    );

    const data = await getTokenPrices(currenciesArr);
    if (data) {
      thunkAPI.dispatch(updateTokenPrices(data));
      
    }
  }
);

export const pricesSlice = createSlice({
    name: "prices",
    initialState,
    reducers: {
        clearTokenPrices: (state) => {
            state.tokenPrices = null
        },
        updateTokenPrices: (state, action) => {
            state.tokenPrices = action.payload
        }
    },
})

export const selectPrices = (state: RootState) => state.prices.tokenPrices;
export const { clearTokenPrices, updateTokenPrices } = pricesSlice.actions;
export default pricesSlice.reducer;


