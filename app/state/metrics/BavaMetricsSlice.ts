import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBaklavaVaultMetrics } from "@/app/utils/Metrics";
import { RootState } from "../store";
import { BAVA } from "@/app/abis/types";
import { getBAVAContract } from "@/app/utils/getContracts";
import { formatUnits } from "ethers";

export interface BAVAVaultSnapshot {
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
  
  export interface BAVAVaultsSnapshot {
    vaults: BAVAVaultSnapshot[];
  }

  export const BAVAVaults: BAVAVaultsSnapshot = {
    vaults: [
      {
        id: "0x2F445C4cC8E114893279fa515C291A3d02160b02",
        vaultName: "BAVA",
        vaultCategory: 6,
        active: true,
        apy: 0,
        tvl: 0,
        url: "https://snowtrace.io/address/0x2f445c4cc8e114893279fa515c291a3d02160b02#code",
        token0: {
            id: "0xc8B4d3e67238e38B20d38908646fF6F4F48De5EC",
            name: "BavaToken",
            symbol: "BAVA",
        },
      },
    ]
  }

  export const fetchBava = createAsyncThunk(
    "updater/fetchBava",
    async (_, thunkAPI) => {
        try {
            const data = await getBaklavaVaultMetrics();

            if (data) {
                const bava_price = parseFloat(data["AllData"]["TokenPrice"]["1"]["bavaPrice"]);

                const contract: BAVA | null = getBAVAContract();

                let reward_rate: number = 0;
                let total_supply: number = 0;
                let apy: number = 0;
                let tvl: number = 0;

                if (contract) {
                    const contract_reward_rate = await contract.rewardRate();
                    reward_rate = Number(contract_reward_rate);
                    const contract_total_supply = await contract.totalSupply();
                    total_supply = Number(contract_total_supply);
                    apy = reward_rate / total_supply * 31556926 * 100;
                    tvl = Number(parseFloat(formatUnits(contract_total_supply, 18)) * bava_price);
                }

                const updatedVault = {
                    ...BAVAVaults.vaults[0],
                    apy,
                    tvl,
                };
                thunkAPI.dispatch(updateBavaData(updatedVault));
            }
        } catch (error) {
            console.error("Error fetching Bava data:", error);
        }
    }
);


  export const BavaSlice = createSlice({
    name: "BavaData",
    initialState: { vaults: [...BAVAVaults.vaults] },
    reducers: {
      clearBavaData: (state) => {
        state.vaults = [...BAVAVaults.vaults];
      },
      updateBavaData: (state, action) => {
        state.vaults = action.payload;
      },
    },
  });
  
  export const selectBavaData = (state: RootState) => state.bava?.vaults;
  export const { clearBavaData, updateBavaData } = BavaSlice.actions;
  export default BavaSlice.reducer;