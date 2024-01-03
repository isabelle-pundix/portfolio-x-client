import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBaklavaVaultMetrics } from "@/app/utils/Metrics";
import { RootState } from "../store";

export interface TraderJoeVaultSnapshot {
    id: string;
    vaultName: string;
    vaultCategory: number;
    active: boolean;
    apy: number;
    tvl: number;
    url: string;
    token0: TokenData;
    token1: TokenData;
  }
  
  export interface TraderJoeVaultsSnapshot {
    vaults: TraderJoeVaultSnapshot[];
  }

  export const TraderJoeVaults: TraderJoeVaultsSnapshot = {
    vaults : [
      {
        id: "0x5cBD2724A4398748615a2ad62ff80607dAC233fC",
        vaultName: "USDC-USDC.e",
        vaultCategory: 5,
        active: true,
        apy: 0,
        tvl: 0,
        url: "https://snowtrace.io/address/0x5cBD2724A4398748615a2ad62ff80607dAC233fC#code",
        token0: {
            id: "0x5db67696C3c088DfBf588d3dd849f44266ff0ffa",
            name: "USD Coin",
            symbol: "USDC",
          },
          token1: {
              id: "0x5db67696C3c088DfBf588d3dd849f44266ff0ffa",
              name: "USD Coin",
              symbol: "USDC",
            },
      },
      {
        id: "0xBFd13f98A84C59D42D2086298100D4d7A715733D",
        vaultName: "BAVA-AVAX",
        vaultCategory: 5,
        active: true,
        apy: 0,
        tvl: 0,
        url: "https://snowtrace.io/address/0xBFd13f98A84C59D42D2086298100D4d7A715733D#code",
        token0: {
            id: "0xc8B4d3e67238e38B20d38908646fF6F4F48De5EC",
            name: "BavaToken",
            symbol: "BAVA",
        },
        token1: {
            id: "0x15C3Eb3B621d1Bff62CbA1c9536B7c1AE9149b57",
            name: "AVAX",
            symbol: "AVAX",
          },
      },
      {
        id: "0xDCeDB18047945de1F05F649569b3d2B0e648D9C8",
        vaultName: "BAVA-USDC.e",
        vaultCategory: 5,
        active: true,
        apy: 0,
        tvl: 0,
        url: "https://snowtrace.io/address/0xDCeDB18047945de1F05F649569b3d2B0e648D9C8#code",
        token0: {
            id: "0xc8B4d3e67238e38B20d38908646fF6F4F48De5EC",
            name: "BavaToken",
            symbol: "BAVA",
        },
        token1: {
            id: "0x5db67696C3c088DfBf588d3dd849f44266ff0ffa",
            name: "USD Coin",
            symbol: "USDC",
          },
      },
      {
        id: "0x2d3147AC6dB2a8DfeE1946a9D59b1B0CBc3489c9",
        vaultName: "AVAX-USDC",
        vaultCategory: 5,
        active: true,
        apy: 0,
        tvl: 0,
        url: "https://snowtrace.io/address/0x2d3147AC6dB2a8DfeE1946a9D59b1B0CBc3489c9#code",
        token0: {
            id: "0x15C3Eb3B621d1Bff62CbA1c9536B7c1AE9149b57",
            name: "AVAX",
            symbol: "AVAX",
        },
        token1: {
            id: "0x5db67696C3c088DfBf588d3dd849f44266ff0ffa",
            name: "USD Coin",
            symbol: "USDC",
          },
      },
      {
        id: "0xFec19beb4e68B4c93622c51d4ad8AF804fe421AA",
        vaultName: "AVAX-USDT",
        vaultCategory: 5,
        active: true,
        apy: 0,
        tvl: 0,
        url: "https://snowtrace.io/address/0xFec19beb4e68B4c93622c51d4ad8AF804fe421AA#code",
        token0: {
            id: "0x15C3Eb3B621d1Bff62CbA1c9536B7c1AE9149b57",
            name: "AVAX",
            symbol: "AVAX",
        },
        token1: {
            id: "0xeceeefcee421d8062ef8d6b4d814efe4dc898265",
            name: "Tether USD",
            symbol: "USDT",
          },
      },
    ]
  }

  const order = [
    "BAVA-AVAX",
    "BAVA-USDC.e",
    "AVAX-USDC",
    "USDC-USDC.e",
    "AVAX-USDT",
  ];

  const multiplier = {
    "BAVA-USDC.e": 0,
    "BAVA-AVAX": 0,
    "BAVA-USDC": 0,
    "AVAX-USDT": 2,
    "AVAX-USDC": 2,
    "USDC-USDC.e": 2,
}

  export const fetchTraderJoe = createAsyncThunk(
    "updater/fetchTraderJoe",
    async (_, thunkAPI) => {
      const data = await getBaklavaVaultMetrics();
  
      if (data) {
        const startIndex = 10;
        // const endIndex = 14;

        let updatedVaults = order.map((vaultName, index) => {
            const dataIndex = startIndex + index;

          const apr_1 = parseFloat(
            data["AllData"]["APRUpgradeable"][dataIndex]["apr"]
          );
  
          const apr_2 = parseFloat(
            data["AllData"]["APRUpgradeable"][dataIndex]["thirdPartyApr"]
          );
          const sum = apr_1 + apr_2;
          const apy =
            Number(((1 + (apr_1 * 0.05 + apr_2) / 36500) ** 365 - 1) * 100 + apr_1);
          const tvl = multiplier[vaultName as keyof typeof multiplier] * 10000 + Number(data["AllData"]["TVLUpgradeable"][dataIndex]["tvl"]);
  
          return {
            ...TraderJoeVaults.vaults.find(
              (vault) => vault.vaultName === vaultName
            ),
            apy,
            tvl,
          };
        });
        console.log("Updated Vaults", updatedVaults);
        thunkAPI.dispatch(updateTraderJoeData(updatedVaults));
      }
    }
  );

  export const TraderJoeSlice = createSlice({
    name: "TraderJoeData",
    initialState: { vaults:[...TraderJoeVaults.vaults]},
    reducers: {
      clearTraderJoeData: (state) => {
        state.vaults = [...TraderJoeVaults.vaults];
      },
      updateTraderJoeData: (state, action) => {
        state.vaults = action.payload;
      },
    },
  });

export const selectTraderJoeData = (state: RootState) => state.traderJoe?.vaults;
export const { clearTraderJoeData, updateTraderJoeData } = TraderJoeSlice.actions;
export default TraderJoeSlice.reducer;
  