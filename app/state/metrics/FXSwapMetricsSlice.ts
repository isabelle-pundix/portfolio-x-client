import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBaklavaVaultMetrics } from "@/app/utils/Metrics";
import { RootState } from "../store";

export interface FXSwapVaultSnapshot {
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

export interface FXSwapVaultsSnapshot {
  vaults: FXSwapVaultSnapshot[];
}

export const FXSwapVaults: FXSwapVaultsSnapshot = {
  vaults: [
    {
      id: "0x1c1e54d8bffb02f261814ca8f06f03efed25ab8d",
      vaultName: "USDT-FX",
      vaultCategory: 0,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://starscan.io/evm/address/0x1C1e54d8BfFB02F261814CA8F06f03EfeD25AB8D",
      token0: {
        id: "0xeceeefcee421d8062ef8d6b4d814efe4dc898265",
        name: "Tether USD",
        symbol: "USDT",
      },
      token1: {
        id: "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd",
        name: "Wrapped Function X",
        symbol: "WFX",
      },
    },
    {
      id: "0x76f2f94429155e4e6e4c126ac9b7165ed347c9d6",
      vaultName: "PUNDIX-FX",
      vaultCategory: 0,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://starscan.io/evm/address/0x76F2F94429155E4E6e4c126aC9B7165Ed347c9D6",
      token0: {
        id: "0xd567b3d7b8fe3c79a1ad8da978812cfc4fa05e75",
        name: "Pundi X Token",
        symbol: "PUNDIX",
      },
      token1: {
        id: "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd",
        name: "Wrapped Function X",
        symbol: "WFX",
      },
    },
    {
      id: "0x610629af1cc8543c0e0348f62559801dc4099a76",
      vaultName: "PURSE-FX",
      vaultCategory: 0,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://starscan.io/evm/address/0x610629Af1Cc8543C0e0348F62559801dc4099A76",
      token0: {
        id: "0x5fd55a1b9fc24967c4db09c513c3ba0dfa7ff687",
        name: "PURSE TOKEN",
        symbol: "PURSE",
      },
      token1: {
        id: "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd",
        name: "Wrapped Function X",
        symbol: "WFX",
      },
    },
    {
      id: "0xefb5a32735390d01e37b620407892e35acc998c3",
      vaultName: "WETH-FX",
      vaultCategory: 0,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://starscan.io/evm/address/0xEfB5a32735390D01e37b620407892E35ACC998C3",
      token0: {
        id: "0x0ce35b0d42608ca54eb7bcc8044f7087c18e7717",
        name: "Wrapped Ether",
        symbol: "WETH",
      },
      token1: {
        id: "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd",
        name: "Wrapped Function X",
        symbol: "WFX",
      },
    },
    {
      id: "0x0fe1ead49b97fbd65875ad8a9da0b869552d0caa",
      vaultName: "BAVA-FX",
      vaultCategory: 0,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://starscan.io/evm/address/0x0FE1eaD49B97FBd65875ad8A9da0B869552d0CAa",
      token0: {
        id: "0xc8B4d3e67238e38B20d38908646fF6F4F48De5EC",
        name: "BavaToken",
        symbol: "BAVA",
      },
      token1: {
        id: "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd",
        name: "Wrapped Function X",
        symbol: "WFX",
      },
    },
  ],
};

const order = ["USDT-FX", "PUNDIX-FX", "PURSE-FX", "WETH-FX", "BAVA-FX"];

export const fetchFXSwap = createAsyncThunk(
  "updater/fetchFXSwap",
  async (_, thunkAPI) => {

    const data = await getBaklavaVaultMetrics();

    if (data) {
      const updatedVaults = order.map((vaultName, index) => {
        
        const apr_1 = parseFloat(
          data["FXSwapVault"]["APRFxSwap"][index]["apr"]
        );
        
        const apr_2 = parseFloat(
          data["FXSwapVault"]["APRFxSwap"][index]["thirdPartyApr"]
        );
        const sum = apr_1 + apr_2;
        const apy = Number((apr_1 / 100 + (1 + apr_2 / 36500) ** 365 - 1) * 100);
        const tvl = Number(data["FXSwapVault"]["TVLFxSwap"][index]["tvl"]);

        return {
          ...FXSwapVaults.vaults.find((vault) => vault.vaultName === vaultName),
          apy,
          tvl,
        };
      });

      thunkAPI.dispatch(updateFXSwapData(updatedVaults));
    }
  }
);

export const FXSwapSlice = createSlice({
  name: "FXSwapData",
  initialState: { vaults:[...FXSwapVaults.vaults]},
  reducers: {
    clearFXSwapData: (state) => {
      state.vaults = [...FXSwapVaults.vaults];
    },
    updateFXSwapData: (state, action) => {
      state.vaults = action.payload;
    },
  },
});

export const selectFXSwapData = (state: RootState) => state.fxSwap?.vaults;
export const { clearFXSwapData, updateFXSwapData } = FXSwapSlice.actions;
export default FXSwapSlice.reducer;
