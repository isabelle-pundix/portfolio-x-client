import { Contract, ContractInterface, ethers, InterfaceAbi } from "ethers";
import { Constants } from "../constants";

import FXSwapV2FactoryAbi from "../abis/FXSwapV2Factory.json";
import FXSwapV2Router02Abi from "../abis/FXSwapV2Router02.json";
import FXSwapV2PairAbi from "../abis/FXSwapV2Pair.json";
import FXSwapV2ERC20Abi from "../abis/FXSwapV2ERC20.json";
import ERC20Abi from "../abis/ERC20.json";
import MULTICALLAbi from "../abis/Multicall.json";
import ERC1967PROXYAbi from "../abis/ERC1967Proxy.json";
import MasterChefV2Abi from "../abis/MasterChefV2.json";
import BalanceOfUtilAbi from "../abis/BalanceOfUtil.json";
import BalanceOfUtil2Abi from "../abis/BalanceOfUtil2.json";
import FXCoreAbi from "../abis/FXCore.json";
import BAVAAbi from "../abis/BAVA.json";
import ChainlinkAbi from "../abis/Chainlink.json";
import GLPLeverageAbi from "../abis/GLPLeverage.json";
import GLPRewardDistributorAbi from "../abis/GLPRewardDistributor.json";
import GLPLeverageVaultAbi from "../abis/GLPLeverageVault.json";
import GLPTokenAbi from "../abis/GLPToken.json";
import USDCLeverageVaultAbi from "../abis/USDCLeverageVault.json";

import {
    ERC1967Proxy,
    ERC20,
    FXSwapV2ERC20,
    FXSwapV2Factory,
    FXSwapV2Pair,
    FXSwapV2Router02,
    MasterChefV2,
    Multicall,
    BalanceOfUtil,
    BalanceOfUtil2,
    FXCore,
    BAVA,
    Chainlink,
    GLPLeverage,
    GLPRewardDistributor,
    GLPLeverageVault,
    GLPToken,
    USDCLeverageVault,
} from "../abis/types";

const fxCoreProviderUrl = Constants.Endpoint.FXCORE_ENDPOINT;
const avalancheProviderUrl = Constants.Endpoint.AVALANCHE_ENDPOINT;

function getContract<T extends Contract = Contract>(
    providerUrl: string,
    contractAddress: string,
    abi: InterfaceAbi,
): T | null {
    const provider = new ethers.JsonRpcProvider(providerUrl);
    try {
        const contract: Contract = new ethers.Contract(contractAddress, abi, provider)
        return contract as T;
    } catch (error) {
        console.error("Failed to get contract", error);
        return null;
    }
}

export function getFXSwapV2FactoryContract() {
    return getContract(fxCoreProviderUrl, Constants.Address.FXSWAPV2FACTORY_ADDRESS, FXSwapV2FactoryAbi) as FXSwapV2Factory | null;
}

export function getFXSwapV2RouterContract() {
    return getContract(fxCoreProviderUrl, Constants.Address.FXSWAPV2ROUTER02_ADDRESS, FXSwapV2Router02Abi) as FXSwapV2Router02 | null;
}

export function getFXSwapV2PairContract(tokenAddress: string) {
    return getContract(fxCoreProviderUrl, tokenAddress, FXSwapV2PairAbi) as FXSwapV2Pair | null;
}

export function getFXSwapV2Erc20Contract(tokenAddress: string) {
    return getContract(fxCoreProviderUrl, tokenAddress, FXSwapV2ERC20Abi) as FXSwapV2ERC20 | null;
}

export function getErc20Contract(tokenAddress: string) {
    return getContract(fxCoreProviderUrl, tokenAddress, ERC20Abi) as ERC20 | null;
}

export function getMulticallContract() {
    return getContract(fxCoreProviderUrl, Constants.Address.MULTICALL_ADDRESS, MULTICALLAbi) as Multicall | null;
}

//need to get ABI and type (this will be for the farm)
export function getErc1967Proxy(){
    return getContract(fxCoreProviderUrl, Constants.Address.ERC1967PROXY_ADDRESS, ERC1967PROXYAbi) as ERC1967Proxy | null;
}

//to use a proxy contract, use proxy address, and proxied contract abi
export function getMasterChefV2Contract() {
    return getContract(fxCoreProviderUrl, Constants.Address.ERC1967PROXY_ADDRESS, MasterChefV2Abi) as MasterChefV2 | null;
}

export function getBalanceOfUtilContract() {
    return getContract(fxCoreProviderUrl, Constants.Address.BALANCE_OF_UTIL_ADDRESS, BalanceOfUtilAbi) as BalanceOfUtil | null;
}

export function getBalanceOfUtil2Contract() {
    return getContract(fxCoreProviderUrl, Constants.Address.BALANCE_OF_UTIL_2_ADDRESS, BalanceOfUtil2Abi) as BalanceOfUtil2 | null;
}

export function getFxCoreContract() {
    return getContract(fxCoreProviderUrl, Constants.Address.FX_CORE_ADDRESS, FXCoreAbi) as FXCore | null;
}

export function getBAVAContract() {
    return getContract(avalancheProviderUrl, Constants.Address.BAVA_ADDRESS, BAVAAbi) as BAVA | null;
}

export function getChainlinkContract() {
    return getContract(avalancheProviderUrl, Constants.Address.CHAINLINK_ADDRESS, ChainlinkAbi) as Chainlink | null;
}

export function getGLPLeverageContract() {
    return getContract(avalancheProviderUrl, Constants.Address.GLP_LEVERAGE_ADDRESS, GLPLeverageAbi) as GLPLeverage | null;
}

export function getGLPRewardDistributorContract() {
    return getContract(avalancheProviderUrl, Constants.Address.GLP_REWARD_DISTRIBUTOR_ADDRESS, GLPRewardDistributorAbi) as GLPRewardDistributor | null;
}

export function getGLPLeverageVaultContract() {
    return getContract(avalancheProviderUrl, Constants.Address.GLP_LEVERAGE_VAULT_ADDRESS, GLPLeverageVaultAbi) as GLPLeverageVault | null;
}

export function getGLPTokenContract() {
    return getContract(avalancheProviderUrl, Constants.Address.GLP_TOKEN_ADDRESS, GLPTokenAbi) as GLPToken | null;
}

export function getUSDCLeverageVaultContract() {
    return getContract(avalancheProviderUrl, Constants.Address.USDC_LEVERAGE_VAULT_ADDRESS, USDCLeverageVaultAbi) as USDCLeverageVault | null;
}