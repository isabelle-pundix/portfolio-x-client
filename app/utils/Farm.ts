import { getMasterChefV2Contract } from "./getContracts";
import { ethers } from "ethers";
import { FarmsState } from "../state/liquidityFarms/farmReducer";
import { PricesState } from "../state/prices/pricesSlice";
import { getSingleTokenPrice, getTokenMetaData2 } from "./Token";

//assert non-null
const masterchefV2Contract = getMasterChefV2Contract()!;

/**
 * @returns The number of pools in the farm contract
 */
export const getPoolLength = async () => {
    const poolLength = await masterchefV2Contract.poolLength();
    return Number(poolLength);
}

/**
 * Gets the user's pending rewards from the given staked rewards pool
 * @param _poolId Pool index of the staked rewards pool.
 * @param _userAddress User's address used in the staking.
 * @returns Number rewards in Ether.
 */
export const getPendingReward = async (_poolId: number, _userAddress: string) => {
    try {
        const pendingRewards = await masterchefV2Contract.pendingReward(_poolId, _userAddress);
        return Number(ethers.formatEther(pendingRewards));
    } catch (error) {
        console.error("getPendingReward: Address is not supported on f(x)Core chain");
        return 0
    }
}

/**
 * Gets the user's information in the given staked rewards pool
 * @param _poolId Pool index of the staked rewards pool.
 * @param _userAddress User's address used in the staking.
 * @returns {amount rewardDebt} An object containing the liquidity deposited (amount) and reward debt
 */
export const getUserInfo = async (_poolId: number, _userAddress: string) => {
    try {
        const userInfo = await masterchefV2Contract.userInfo(_poolId, _userAddress);
        return {
            amount: ethers.formatEther(userInfo.amount),
            rewardDebt: ethers.formatEther(userInfo.rewardDebt),
        }
    } catch (error) {
        console.error("getUserInfo: Address is not supported on f(x)Core chain");
        return {
            amount: "0",
            rewardDebt: "0"
        }
    }
}

/**
 *  Given the Farms state object, replaces each Token object in the Farm with
 *  an updated Token instance. Updates the logo and price of each Token
 * @param _farmsState The Farms state in Redux
 * @param _pricesState The Prices state in Redux
 * @param _userAddress The user address string
 * @returns UpdatedFarmsPosition An UpdatedFarmsPosition object containing user address and liquidity positions
 */
export const retrieveFarmPosMeta = (_farmsState: FarmsState, _pricesState: PricesState, _userAddress: string | null = null) => {
    if (_farmsState.farms != null) {
        let farms = _farmsState.farms;
        for (let i = 0; i < Object.keys(farms).length; i++) {
            farms = {
                ...farms,
                [i]: {
                    ...farms[i],
                    token0: getSingleTokenPrice(_pricesState, getTokenMetaData2(farms[i].token0)),
                    token1: getSingleTokenPrice(_pricesState, getTokenMetaData2(farms[i].token1)),
                }
            }
        }
        const farmPosUpdated: UpdatedFarmPositions = {
            userAddress: _userAddress,
            farms: Object.values(farms),
        }
        return farmPosUpdated
    } else {
        return null
    }
}

