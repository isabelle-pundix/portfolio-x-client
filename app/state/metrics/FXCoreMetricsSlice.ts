import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBaklavaVaultMetrics } from "@/app/utils/Metrics";
import { RootState } from "../store";
import { FXCore } from "@/app/abis/types";
import { getFxCoreContract } from "@/app/utils/getContracts";
import { ethers, formatUnits } from "ethers";

export interface FXCoreVaultSnapshot {
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
  
  export interface FXCoreVaultsSnapshot {
    vaults: FXCoreVaultSnapshot[];
  }

  export const FXCoreVaults: FXCoreVaultsSnapshot = {
    vaults: [
      {
        id: "0x5c24B402b4b4550CF94227813f3547B94774c1CB",
        vaultName: "stFX",
        vaultCategory: 1,
        active: true,
        apy: 0,
        tvl: 0,
        url: "https://starscan.io/evm/token/0x5c24B402b4b4550CF94227813f3547B94774c1CB/token-transfers",
        token0: {
          id: "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd",
          name: "Wrapped Function X",
          symbol: "WFX",
        },
      },
    ]
  }

  export const fetchFXCore = createAsyncThunk(
  "updater/fetchFXCore",
  async (_, thunkAPI) => {
    const data = await getBaklavaVaultMetrics();
  
    if (data) {
      const stfx_apr = parseFloat(data["STFX_APR"]["DATA"]["MAINNET"]["stFXAPR"]);
      const bava_apr = parseFloat(data["STFX_APR"]["DATA"]["MAINNET"]["BAVAAPR"]);
      const total_apy = Number(((1 + stfx_apr / 36500) ** 365 - 1) * 100 + bava_apr);
      const fx_price = parseFloat(data["AllData"]["TokenPrice"]["5"]["fxPrice"]);

      const contract: FXCore | null = getFxCoreContract();

      let total_assets: number = 0;
      let tvl: number = 0;

      if (contract) {
        const contract_total_assets = await contract.totalAssets();
        total_assets = Number(parseFloat(formatUnits(contract_total_assets, 18)));
        
        tvl = Number(Number(total_assets) * fx_price);
        console.log("total assets", total_assets)
      }

      const updatedVault = {
        ...FXCoreVaults.vaults[0],
        apy: total_apy,
        tvl,
      };

      console.log("Updated Vault", updatedVault);
      thunkAPI.dispatch(updateFXCoreData(updatedVault));
    }
  }
);
  
  export const FXCoreSlice = createSlice({
    name: "FXCoreData",
    initialState: { vaults: [...FXCoreVaults.vaults] },
    reducers: {
      clearFXCoreData: (state) => {
        state.vaults = [...FXCoreVaults.vaults];
      },
      updateFXCoreData: (state, action) => {
        state.vaults = action.payload;
      },
    },
  });
  
  export const selectFXCoreData = (state: RootState) => state.fxCore?.vaults;
  export const { clearFXCoreData, updateFXCoreData } = FXCoreSlice.actions;
  export default FXCoreSlice.reducer;
  