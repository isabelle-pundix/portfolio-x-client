import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBaklavaVaultMetrics } from "@/app/utils/Metrics";
import { RootState } from "../store";

export interface PangolinVaultSnapshot {
  id: string;
  vaultName: string;
  vaultCategory: number;
  active: boolean;
  apy: number;
  tvl: number;
  url: string;
  token0: TokenData;
  token1?: TokenData;
}

export interface PangolinVaultsSnapshot {
  vaults: PangolinVaultSnapshot[];
}

export const PangolinVaults: PangolinVaultsSnapshot = {
  vaults: [
    {
      id: "0x91CCbbC44221ddb70f54d9E911C4fE80be944232",
      vaultName: "USDC-USDC.e",
      vaultCategory: 4,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://snowtrace.io/address/0x91CCbbC44221ddb70f54d9E911C4fE80be944232#code",
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
      id: "0x2E136DcB78C5C166a55C90F87A4bBFb7C980B7a2",
      vaultName: "BAVA-AVAX",
      vaultCategory: 4,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://snowtrace.io/address/0x2E136DcB78C5C166a55C90F87A4bBFb7C980B7a2#code",
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
      id: "0x9841c066021Bfb9D1c79e8E82A597Dd133d8804F",
      vaultName: "AVAX-USDT.e",
      vaultCategory: 4,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://snowtrace.io/address/0x9841c066021Bfb9D1c79e8E82A597Dd133d8804F#code",
      token0: {
        id: "0x15C3Eb3B621d1Bff62CbA1c9536B7c1AE9149b57",
        name: "AVAX",
        symbol: "AVAX",
      },
      token1: {
        id: "0xecEEEfCEE421D8062EF8d6b4D814efe4dc898265",
        name: "Tether USD",
        symbol: "USDT",
      },
    },
    {
      id: "0xc331aF15574d80a4a34FEd8Ee1369E7900dCD47E",
      vaultName: "AVAX-USDC.e",
      vaultCategory: 4,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://snowtrace.io/address/0xc331aF15574d80a4a34FEd8Ee1369E7900dCD47E#code",
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
      id: "0x17bc0557D5946b1304f8c0b5af18f4FadDBf9D49",
      vaultName: "AVAX-PNG",
      vaultCategory: 4,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://snowtrace.io/address/0x17bc0557d5946b1304f8c0b5af18f4faddbf9d49#code",
      token0: {
        id: "0x15C3Eb3B621d1Bff62CbA1c9536B7c1AE9149b57",
        name: "AVAX",
        symbol: "AVAX",
      },
      token1: {
        id: "0x60781c2586d68229fde47564546784ab3faca982",
        name: "Pangolin",
        symbol: "PNG",
      },
    },
    {
      id: "0xeccFBE23903932DE517b0eb1f80d9e8779A864E0",
      vaultName: "QI-AVAX",
      vaultCategory: 4,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://snowtrace.io/address/0xeccFBE23903932DE517b0eb1f80d9e8779A864E0#code",
      token0: {
        id: "0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5",
        name: "BENQI",
        symbol: "QI",
      },
      token1: {
        id: "0x15C3Eb3B621d1Bff62CbA1c9536B7c1AE9149b57",
        name: "AVAX",
        symbol: "AVAX",
      },
    },
    {
      id: "0x0D382907A342c0ac2DD735a0F8defe59A28D5DE4",
      vaultName: "AVAX-WETH.e",
      vaultCategory: 4,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://snowtrace.io/address/0x0D382907A342c0ac2DD735a0F8defe59A28D5DE4#code",
      token0: {
        id: "0x15C3Eb3B621d1Bff62CbA1c9536B7c1AE9149b57",
        name: "AVAX",
        symbol: "AVAX",
      },
      token1: {
        id: "0x0CE35b0D42608Ca54Eb7bcc8044f7087C18E7717",
        name: "Wrapper Ether",
        symbol: "WETH",
      },
    },
    {
      id: "0xd0Cf7b1071c7c12a7c36ca4CA863B2583D9C338A",
      vaultName: "sAVAX-AVAX",
      vaultCategory: 4,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://snowtrace.io/address/0xd0Cf7b1071c7c12a7c36ca4CA863B2583D9C338A#code",
      token0: {
        id: "0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE",
        name: "AVAX",
        symbol: "sAVAX",
      },
      token1: {
        id: "0x15C3Eb3B621d1Bff62CbA1c9536B7c1AE9149b57",
        name: "AVAX",
        symbol: "AVAX",
      },
    },
    {
      id: "0xD146D2b9E017585faBbE0943e122b07FaefF1380",
      vaultName: "PNG",
      vaultCategory: 4,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://snowtrace.io/address/0xD146D2b9E017585faBbE0943e122b07FaefF1380#code",
      token0: {
        id: "0x60781c2586d68229fde47564546784ab3faca982",
        name: "Pangolin",
        symbol: "PNG",
      },
    },
  ],
};

const order = [
  "AVAX-USDT.e",
  "AVAX-USDC.e",
  "BAVA-AVAX",
  "AVAX-PNG",
  "QI-AVAX",
  "AVAX-WETH.e",
  "USDC-USDC.e",
  "sAVAX-AVAX",
  "",
  "PNG",
];

const multiplier = {
  "BAVA-AVAX": 0,
  "AVAX-USDT.e": 1,
  "AVAX-USDC.e": 1,
  "AVAX-PNG": 1,
  "PNG": 1,
  "USDC-USDC.e": 2,
  "sAVAX-AVAX": 2,
  "QI-AVAX": 2,
  "AVAX-WETH.e": 2
}

export const fetchPangolin = createAsyncThunk(
  "updater/fetchPangolin",
  async (_, thunkAPI) => {
    const data = await getBaklavaVaultMetrics();

    if (data) {
      let updatedVaults = order.map((vaultName, index) => {
        const apr_1 = parseFloat(
          data["AllData"]["APRUpgradeable"][index]["apr"]
        );

        const apr_2 = parseFloat(
          data["AllData"]["APRUpgradeable"][index]["thirdPartyApr"]
        );
        const sum = apr_1 + apr_2;
        const apy =
          Number(((1 + (apr_1 * 0.05 + apr_2) / 36500) ** 365 - 1) * 100 + apr_1);
        const tvl = multiplier[vaultName as keyof typeof multiplier] * 10000 + Number(data["AllData"]["TVLUpgradeable"][index]["tvl"]);

        return {
          ...PangolinVaults.vaults.find(
            (vault) => vault.vaultName === vaultName
          ),
          apy,
          tvl,
        };
      });

      updatedVaults = updatedVaults.filter((_, index) => index !== 8);

      console.log("Updated Vaults", updatedVaults);
      thunkAPI.dispatch(updatePangolinData(updatedVaults));
    }
  }
);

export const PangolinSlice = createSlice({
    name: "PangolinData",
    initialState: { vaults:[...PangolinVaults.vaults]},
    reducers: {
      clearPangolinData: (state) => {
        state.vaults = [...PangolinVaults.vaults];
      },
      updatePangolinData: (state, action) => {
        state.vaults = action.payload;
      },
    },
  });

export const selectPangolinData = (state: RootState) => state.pangolin?.vaults;
export const { clearPangolinData, updatePangolinData } = PangolinSlice.actions;
export default PangolinSlice.reducer;
