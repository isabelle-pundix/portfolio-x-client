import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBaklavaVaultMetrics } from "@/app/utils/Metrics";
import { RootState } from "../store";
import {
  Chainlink,
  GLPLeverage,
  GLPRewardDistributor,
  GLPLeverageVault,
  GLPToken,
} from "@/app/abis/types";
import {
  getChainlinkContract,
  getGLPLeverageContract,
  getGLPRewardDistributorContract,
  getGLPLeverageVaultContract,
  getGLPTokenContract,
} from "@/app/utils/getContracts";
import { formatUnits } from "ethers";
import { Constants } from "@/app/constants";

export interface GLPVaultSnapshot {
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

export interface GLPVaultsSnapshot {
  vaults: GLPVaultSnapshot[];
}

export const GLPVaults: GLPVaultsSnapshot = {
  vaults: [
    {
      id: "0xf160C07c5a7e80F9bFA61f9554FF449b8B3eD990",
      vaultName: "bGLP",
      vaultCategory: 2,
      active: true,
      apy: 0,
      tvl: 0,
      url: "https://snowtrace.io/address/0xf160C07c5a7e80F9bFA61f9554FF449b8B3eD990",
      token0: {
        id: "0x01234181085565ed162a948b6a5e88758CD7c7b8",
        name: "GLP Token",
        symbol: "GLP",
      },
    },
  ],
};

export const fetchGlp = createAsyncThunk(
  "updater/fetchGlp",
  async (_, thunkAPI) => {
    const data = await getBaklavaVaultMetrics();

    if (data) {
      const avax_token_price = parseFloat(
        data["AllData"]["TokenPrice"]["0"]["avaxPrice"]
      );
      const apr_arr_upgradeable = parseFloat(
        data["AllData"]["APRUpgradeable"]["15"]["apr"]
      );

      // contracts
      const glpLeverageContract: GLPLeverage | null = getGLPLeverageContract();
      const chainLinkContract: Chainlink | null = getChainlinkContract();
      const glpLeverageVaultContract: GLPLeverageVault | null =
        getGLPLeverageVaultContract();
      const glpRewardDistributorContract: GLPRewardDistributor | null =
        getGLPRewardDistributorContract();
      const glpTokenContract: GLPToken | null = getGLPTokenContract();

      let tvl: number = 0;
      let apy: number = 0;

      if (
        chainLinkContract &&
        glpLeverageContract &&
        glpLeverageVaultContract &&
        glpRewardDistributorContract
      ) {
        // calculate tvl
        const contract_price = await chainLinkContract.latestRoundData();
        const contract_decimal = await chainLinkContract.decimals();
        const decimals = contract_decimal;
        const price_wei = contract_price.answer;
        const glp_token_price = parseFloat(formatUnits(price_wei, decimals));
        const contract_vault_asset =
          await glpLeverageVaultContract.totalAssets();
        tvl =
          Number(parseFloat(formatUnits(contract_vault_asset, 'ether')) * glp_token_price);

        // calculate apy
        const contract_glp_vault_leverage =
          await glpLeverageContract.leverage();
        const glp_vault_leverage = parseFloat(
          formatUnits(contract_glp_vault_leverage, 12)
        );
        const contract_tokens_per_interval =
          await glpRewardDistributorContract.tokensPerInterval();
        const annual_reward_usd =
          parseFloat(formatUnits(contract_tokens_per_interval, 'ether')) *
          avax_token_price;
        const contract_glp_utilization =
          await glpLeverageContract.utilization();

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
          
        const glp_total_staked: bigint | undefined =
          await glpTokenContract?.balanceOf(Constants.Address.fGLP_ADDRESS);
        if (glp_total_staked !== undefined) {
          const glp_tvl =
            glp_token_price * parseFloat(formatUnits(glp_total_staked, 'ether'));
          const glp_apr = (annual_reward_usd / glp_tvl) * 100;

          const apr = glp_vault_leverage ? glp_apr * (1 + ((glp_vault_leverage - 1) * (1 / (glp_vault_leverage) + (1 - (1 / (glp_vault_leverage) + 0.1 + stableRatio))))) : 0
          apy = Number(apr + apr_arr_upgradeable)
        }
      }

      const updatedVault = {
        ...GLPVaults.vaults[0],
        apy,
        tvl,
      };
      console.log("Updated Vault", updatedVault);
      thunkAPI.dispatch(updateGlpData(updatedVault));
    }
  }
);

export const GlpSlice = createSlice({
    name: "GlpData",
    initialState: { vaults: [...GLPVaults.vaults] },
    reducers: {
      clearGlpData: (state) => {
        state.vaults = [...GLPVaults.vaults];
      },
      updateGlpData: (state, action) => {
        state.vaults = action.payload;
      },
    },
  });
  
  export const selectGlpData = (state: RootState) => state.glp?.vaults;
  export const { clearGlpData, updateGlpData } = GlpSlice.actions;
  export default GlpSlice.reducer;
