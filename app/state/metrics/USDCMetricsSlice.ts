import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBaklavaVaultMetrics } from "@/app/utils/Metrics";
import { RootState } from "../store";
import {
  Chainlink,
  GLPLeverage,
  GLPRewardDistributor,
  USDCLeverageVault,
  GLPToken,
} from "@/app/abis/types";
import {
  getChainlinkContract,
  getGLPLeverageContract,
  getGLPRewardDistributorContract,
  getUSDCLeverageVaultContract,
  getGLPTokenContract,
} from "@/app/utils/getContracts";
import { formatUnits } from "ethers";
import { Constants } from "@/app/constants";

export interface USDCVaultSnapshot {
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

export interface USDCVaultsSnapshot {
  vaults: USDCVaultSnapshot[];
}

export const USDCVaults: USDCVaultsSnapshot = {
  vaults: [
    {
      id: "0x7a2e6F95cA2B90CDC52f92dda8A7F2d0C2663264",
      vaultName: "bUSDC",
      vaultCategory: 3,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://snowtrace.io/address/0x7a2e6F95cA2B90CDC52f92dda8A7F2d0C2663264",
      token0: {
        id: "0x5db67696C3c088DfBf588d3dd849f44266ff0ffa",
        name: "USD Coin",
        symbol: "USDC",
      },
    },
  ],
};

export const fetchUsdc = createAsyncThunk(
  "updater/fetchUsdc",
  async (_, thunkAPI) => {
    const data = await getBaklavaVaultMetrics();

    if (data) {
      const avax_token_price = parseFloat(
        data["AllData"]["TokenPrice"]["0"]["avaxPrice"]
      );
      const apr_arr_upgradeable = parseFloat(
        data["AllData"]["APRUpgradeable"]["16"]["apr"]
      );

      // contracts
      const usdcLeverageVaultContract: USDCLeverageVault | null =
        getUSDCLeverageVaultContract();
      const glpLeverageContract: GLPLeverage | null = getGLPLeverageContract();
      const glpRewardDistributorContract: GLPRewardDistributor | null =
        getGLPRewardDistributorContract();
      const chainLinkContract: Chainlink | null = getChainlinkContract();
      const glpTokenContract: GLPToken | null = getGLPTokenContract();

      let tvl: number = 0;
      let apy: number = 0;

      if (
        usdcLeverageVaultContract &&
        chainLinkContract &&
        glpLeverageContract &&
        glpRewardDistributorContract &&
        glpTokenContract
      ) {
        // calculate tvl
        const contract_vault_asset =
          await usdcLeverageVaultContract.totalAssets();
        tvl = parseFloat(formatUnits(contract_vault_asset, "mwei"));

        // calculate apy
        const contract_tokens_per_interval =
          await glpRewardDistributorContract.tokensPerInterval();
        const annual_reward_usd =
          parseFloat(formatUnits(contract_tokens_per_interval, "ether")) *
          avax_token_price;
        const contract_price = (await chainLinkContract.latestRoundData()).answer;
        const contract_decimals = await chainLinkContract.decimals();
        const glp_token_price = parseFloat(formatUnits(contract_price, contract_decimals));
        const glp_total_staked: bigint | undefined =
          await glpTokenContract?.balanceOf(Constants.Address.fGLP_ADDRESS);
        const glp_tvl = glp_token_price * parseFloat(formatUnits(glp_total_staked, 'ether'));
        const glp_apr = annual_reward_usd / glp_tvl * 100;
        const contract_glp_vault_leverage = await glpLeverageContract.leverage();
        const glp_vault_leverage = parseFloat(formatUnits(contract_glp_vault_leverage, 12));
        const contract_glp_utilization = await glpLeverageContract.utilization();

        let stableRatio = 0;
        if (parseInt(contract_glp_utilization.toString()) > (9935 * 1e12) / 10000) {
          stableRatio = 50 / 100;
        } else if (parseInt(contract_glp_utilization.toString()) <= (95 * 1e12) / 100) {
          stableRatio = 30 / 100;
        } else {
            stableRatio = parseInt((
              (contract_glp_utilization * BigInt(2) - (BigInt(1e12) * BigInt(16)) / BigInt(10)) / BigInt(1e12)
            ).toString());
          }

          const apr = glp_apr * (glp_vault_leverage - 1) * stableRatio * Number(contract_glp_utilization) / 1e12;
          apy = apr + apr_arr_upgradeable;
      }
      const updatedVault = {
        ...USDCVaults.vaults[0],
        apy,
        tvl,
      };
      console.log("Updated Vault", updatedVault);
      thunkAPI.dispatch(updateUsdcData(updatedVault));
    }
    
  }
);

export const UsdcSlice = createSlice({
    name: "UsdcData",
    initialState: { vaults: [...USDCVaults.vaults] },
    reducers: {
      clearUsdcData: (state) => {
        state.vaults = [...USDCVaults.vaults];
      },
      updateUsdcData: (state, action) => {
        state.vaults = action.payload;
      },
    },
  });
  
  export const selectUsdcData = (state: RootState) => state.usdc?.vaults;
  export const { clearUsdcData, updateUsdcData } = UsdcSlice.actions;
  export default UsdcSlice.reducer;

