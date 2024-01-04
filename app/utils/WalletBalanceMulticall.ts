import { BigNumberish, ethers } from "ethers";
import { BalanceOfUtil, BalanceOfUtil2 } from "../abis/types";
import { supportedTokensJSON } from "../constants/Tokens";
import { TokenBalances } from "../state/walletBalance/walletBalanceSlice";
import { getBalanceOfUtilContract, getBalanceOfUtil2Contract } from "./getContracts";
import { FXCORE_ENDPOINT } from "../constants/Endpoints";

export interface SupportedTokenInfo {
  name: string;
  chainId: number;
  symbol: string;
  decimals: number;
  address: string;
  logoURI: string;
}

const tokenList: SupportedTokenInfo[] = JSON.parse(supportedTokensJSON).tokens;

const tokenAddresses: string[] = tokenList.map((token) => {
  return token.address;
});

const tokenDecimals: number[] = tokenList.map((token) => {
  return token.decimals;
});

const tokenSymbols: string[] = tokenList.map((token) => {
  return token.symbol;
});

const providerUrl = FXCORE_ENDPOINT;
const provider = new ethers.JsonRpcProvider(providerUrl);

function getContractForERC20Tokens(): BalanceOfUtil | null {
  const ERC20TokensContract: BalanceOfUtil | null = getBalanceOfUtilContract();
  return ERC20TokensContract;
}

function getContractForNativeTokens(): BalanceOfUtil2 | null {
  const nativeTokenContract: BalanceOfUtil2 | null =
    getBalanceOfUtil2Contract();
  return nativeTokenContract;
}

export const fetchUserBalance = async (walletAddress: string) => {
  const tokenBalances: TokenBalances[] = [];
  if (walletAddress) {
    const nativeTokenContract = getContractForNativeTokens();
    if (nativeTokenContract) {
      const rawFxBalance: BigNumberish =
        await nativeTokenContract.getNativeBalance(walletAddress);
      const fxBalanceInfo: TokenBalances = {
        tokenSymbol: "FX",
        tokenBalance: parseFloat(ethers.formatUnits(rawFxBalance, 18)),
      };
      tokenBalances.push(fxBalanceInfo);
    }

    const ERC20TokensContractcontract = getContractForERC20Tokens();
    if (ERC20TokensContractcontract) {
      const rawTokenBalances: BigNumberish[] =
        await ERC20TokensContractcontract.getBalances(
          tokenAddresses,
          walletAddress
        );

      let balanceArr: number[] = [];

      if (rawTokenBalances.length === tokenDecimals.length) {
        rawTokenBalances.forEach((rawBal, index) => {
          const tokenDecimal = tokenDecimals[index];
          const formattedBalance = parseFloat(
            ethers.formatUnits(rawBal, tokenDecimal)
          );
          balanceArr.push(formattedBalance);
        });
      } else {
        console.error("Error - arrays have different lengths.");
      }

      if (balanceArr.length === tokenSymbols.length) {
        balanceArr.forEach((bal, index) => {
          const tokenSymbol = tokenSymbols[index];
          const tokenBal: TokenBalances = {
            tokenSymbol: tokenSymbol,
            tokenBalance: bal,
          };
          tokenBalances.push(tokenBal);
        });
      } else {
        console.error("Error - arrays have different lengths.");
      }
    }
  }
  return tokenBalances;
};
