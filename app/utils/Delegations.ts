import serveraxios from "../config/ServerAxios";
import { ethers } from "ethers";
import Big from 'big.js';
import axios, { AxiosResponse } from "axios";

// const ethersUtils = ethers.utils;

export interface DelegationsAveragePriceInfo {
    new: boolean
    height: number
    delegatedValidators: DelegatedValidators
}

interface DelegatedValidators {
    [index: string]: DelegationDataPerValidator;
}

interface DelegationDataPerValidator {
    amount: string
    averagePrice: string
}

/**
 * Retrieves all the delegations for a given delegator address.
 * Returns an array containing each delegation's information and the balance of the delegation.
 * If address has no delegation, returns an empty array: [].
 * @param cosmosAddress A delegator's fx address
 */
export const getDelegatorDelegations = async (cosmosAddress: string) => {
    try {
        const response: AxiosResponse<DelegationResponses> = await axios.get(`https://fx-rest.functionx.io/cosmos/staking/v1beta1/delegations/${cosmosAddress}`);
        return response.data
    } catch (error: any) {
        console.error("An error occurred while getting delegations");
        return null
    }
}

/**
 * Returns the Moniker of a given validator address
 * @param validatorAddress A validator address
 */
export const getValidatorMoniker = async (validatorAddress: string) => {
    try {
        const result: AxiosResponse<ValidatorInfo> = await axios.get(`https://fx-rest.functionx.io/cosmos/staking/v1beta1/validators/${validatorAddress}`);
        return result.data.validator.description.moniker
    } catch (error: any) {
        console.error("An error occurred while getting validator(s)");
        return null
    }
}

/**
 * Retrieves given delegator's FX reward amount for the delegation to the given validator.
 * The returned amount is in Big format
 * @param delegatorAddress A delegator's fx address
 * @param validatorAddress A validator's address
 */
export const getReward = async (delegatorAddress: string, validatorAddress: string) => {
    try {
        const result: AxiosResponse<RewardResponse> = await axios.get(`https://fx-rest.functionx.io/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards/${validatorAddress}`);
        const rewardInFx = +ethers.formatUnits(
            ethers.parseUnits(result.data.rewards[0].amount, 18),
            36
        )
        return rewardInFx.toString()
    } catch (error: any) {
        console.error(`An error occurred while getting delegator reward for ${validatorAddress} validator`);
        return null
    }
}

/**
 * Retrieves a Validator's commission amount
 * @param _address A given validator address
 */
export const getValidatorCommission = async (_address: string) => {
    try {
        const result = await serveraxios.get(
            "/api/validatorCommission",
            {
                params: {
                    address: _address,
                },
            }
        );
        return result.data as ValidatorCommissionRes
    } catch (error: any) {
        console.error("An error occurred while getting validator commissions");
        return null
    }
}

/**
 * Retrieves a Validator's outstanding rewards
 * @param _address A given validator address
 */
export const getValidatorOutstandingRewards = async (_address: string) => {
    try {
        const result = await serveraxios.get(
            "/api/validatorOutstandingRewards",
            {
                params: {
                    address: _address
                }
            }
        );
        return result.data as ValidatorOutstandingRewardsRes
    } catch (error: any) {
        console.error("An error occurred while getting validator outstanding rewards");
        return null
    }
}

/**
 * DEPRECATED
 * if address has no withdrawals, result = []
 */
export const getWithdrawals0 = async (_address: string, _module: string, _v: boolean) => {
    try {
        const result = await serveraxios.get(
            "/api/withdrawals0",
            {
                params: {
                    address: _address,
                    module: _module,
                    v: _v
                }
            }
        );
        return result.data as TxnLogEvents
    } catch (error: any) {
        console.error("An error occurred while getting withdrawals");
        return null
    }
}

/**
 * Gets an array containing all the withdrawal events for a given address.
 * If address has no withdrawals, returns an empty array: []
 * @param _address The delegator's fx address (string) or a validator address
 * @param _module The module to query from (string)
 * @param _v Set to true if querying withdrawals and withdrawn commissions for a given validator address
 */
export const getWithdrawals1 = async (_address: string, _module: string, _v: boolean) => {
    try {
        const result = await serveraxios.get(
            "/api/withdrawals1",
            {
                headers: { "Content-Type": "application/json" },
                params: {
                    address: _address,
                    module: _module,
                    v: _v
                }
            }
        );
        return result.data as TxnLogEvents
    } catch (error: any) {
        console.error("An error occurred while getting withdrawals");
        return null
    }
}

//export const consolidateDelegations = (_data: DelegationData) => {
//    let default_withdrawals: TxnLogEvents = {
//        result: []
//    }
//    let default_totalRewards: DelegatorTotalRewardsRes = {
//        result: {
//            rewards: [
//                {
//                    validator_address: "",
//                    reward: [
//                        {
//                            denom: "FX",
//                            amount: "0",
//                        }
//                    ]
//                }
//            ],
//            total: [
//                {
//                    denom: "FX",
//                    amount: "0",
//                }
//            ]
//        }
//    }
//    let result: any = {
//        delegations: [],
//        withdrawals: _data.withdrawals ? _data.withdrawals : default_withdrawals,
//        poolInfo: _data.poolInfo,
//        totalDelegationRewards: _data.totalRewards ? _data.totalRewards.result.total : default_totalRewards.result.total
//    }
//    if (_data.validatorInfo != null && _data.delegations != null && _data.totalRewards != null) {
//        _data.validatorInfo.result.validators.forEach((_validator) => {
//            let del = {
//                delegation: _data.delegations.result.delegation_responses.find(
//                    res => res.delegation.validator_address === _validator.operator_address
//                ),
//                validator: _validator,
//                rewards: _data.totalRewards.result.rewards.find(
//                    rew => rew.validator_address === _validator.operator_address
//                )
//           }
//            result.delegations.push(del);
//        })
//    }
//    return result as ConsolidatedDelegation
//}

//get the FX logo uri and calculates the USD value of each delegation and rewards and total rewards
//export const getRewardLogoAndValues = (_data: ConsolidatedDelegation, _fxPriceUSD: number) => {
//    if (_data.totalDelegationRewards.length !== 0) {
//        _data.totalDelegationRewards[0].value = (
//            +ethersUtils.formatUnits(
//                ethersUtils.parseUnits(_data.totalDelegationRewards[0].amount, 18),
//                36
//            ) * _fxPriceUSD
//        ).toString();
//    }
//    if (_data.delegations.length >= 1) {
//        _data.delegations.forEach((del) => {
//            if (del.delegation) {
//                del.delegation.balance.value = (
//                    +ethersUtils.formatEther(
//                        ethersUtils.parseUnits(del.delegation.balance.amount, "wei")
//                    ) * _fxPriceUSD
//                ).toString();
//            } else {
//                del.delegation = {
//                    balance: {
//                        amount: "0",
//                        denom: "FX",
//                        value: "0"
//                    },
//                    delegation: {
//                        delegator_address: "",
//                        shares: "",
//                        validator_address: ""
//                    }
//                }
//            }
//            // console.log(del)
//            // console.log(del.rewards);
//            if (del.rewards && typeof(del.rewards.reward) !== "undefined" && del.rewards.reward[0]) {
//                del.rewards.reward[0].value = (
//                    +ethersUtils.formatUnits(
//                        ethersUtils.parseUnits(del.rewards.reward[0].amount, 18),
//                        36
//                    ) * _fxPriceUSD
//                ).toString();
//                del.rewards.reward[0].logoURI = Constants.Tokens.Logos.FX;
//            } else {
//                del.rewards = {
//                    validator_address: "",
//                    reward: [{
//                        amount: "0",
//                        denom: "FX",
//                        logoURI: Constants.Tokens.Logos.FX,
//                        value: "0"
//                    }]
//                }
//            }
//        });
//    }
//    return _data
//}

/**
 * Given a TxnLogEvents object, calculates the total FX rewards withdrawn
 * @param withdrawals A TxnLogEvents object
 */
export const calculateTotalWithdrawals = (withdrawals: TxnLogEvents) => {
    let total = 0;
    if (withdrawals && withdrawals.result.length > 1) {
        total = (withdrawals.result as TxnLogEvent[]).reduce((acc: number, withdrawal: TxnLogEvent) => {
            const valNum = +ethers.formatEther(
                ethers.parseUnits(withdrawal.attributes[0].value.slice(0, -2), "wei")
            );
            return acc + valNum;
        }, 0);
    }
    return total
}

/**
 * Given a ConsolidatedDelegation object, checks the totalDelegationRewards array.
 * If array is not empty, formats the amount to readable format.
 * Otherwise, defaults delRewardsAmt and delRewardsVal to "0" for each.
 * @param {ConsolidatedDelegation} A CondolidatedDelegation object
*/
export const validateDelegationRewards = (consolidatedDelegation: ConsolidatedDelegation) => {
    let delRewardsAmt = "0";
    let delRewardsVal = "0";
    if (consolidatedDelegation.totalDelegationRewards.length >= 1) {
        delRewardsAmt = ethers.formatUnits(
            ethers.parseUnits(consolidatedDelegation.totalDelegationRewards[0]!.amount, 18),
            36
        ).slice(0, 12)
        delRewardsVal = consolidatedDelegation.totalDelegationRewards[0]!.value.slice(0, 12);
    }
    return {
        delRewardsAmt,
        delRewardsVal
    }
}

/**
 * check if user has migrated,if no return null, if yes return oldAddress
 * @param {string} ethAddress - user current ethereum hex address
 * @returns {Promise} cosmosAddress - user migrated old cosmos address
 */
export const getCosmosAddress = async (ethAddress: string): Promise<string> => {
    try {
        const res: AxiosResponse<EthToCosmosAddress> = await axios.get(`https://fx-rest.functionx.io/ethermint/evm/v1/cosmos_account/${ethAddress}`)
        return res.data.cosmos_address
    } catch (error) {
        console.error("getCosmosAddress: Address not supported on f(x)Core network");
        return ""
    }
}

/**
 * Get staking(delegate,undelegate,redelegate) transactions data
 * message.module='staking'
 * @param {string} sender - user cosmos address (fx)
 * @param {number} offset - nos of txs to be offset (must be greater than pagination_limit to flip the page)
 * @param {number} pagination_limit - maximum number of results return
 * @param {enum} order - the order of txs based on block height 
 * @returns {Promise} FxTransactionsData - Staking transcations data (Descending order of heights)
 */
const getStakeTxs = async (sender: string, offset: number, pagination_limit: number, order: "UNSPECIFIED" | "ASC" | "DESC" = "UNSPECIFIED"): Promise<FxTransactionsData> => {
    let _order = 0;
    if (order === "ASC") {
        _order = 1;
    } else if (order === "DESC") {
        _order = 2;
    }
    const res = await axios.get(`https://fx-rest.functionx.io/cosmos/tx/v1beta1/txs?events=message.sender%3D'${sender}'&events=message.module%3D'staking'&pagination.offset=${offset}&pagination.limit=${pagination_limit}&order_by=${_order}`)
    return res.data as FxTransactionsData
}

/**
 * check if user has migrated, if not migrated return null, if yes return old Address (before migration)
 * @param {string} cosmosAddress - user current ethereum hex address
 * @returns {Promise} oldAddress - user migrated old cosmos address
 */
export const getOldCosmosAddress = async (cosmosAddress: string): Promise<string | null> => {
    const res = await axios.get(`https://fx-rest.functionx.io/cosmos/tx/v1beta1/txs?events=message.action='/fx.migrate.v1.MsgMigrateAccount'&events=transfer.recipient='${cosmosAddress}'&pagination.offset=0&pagination.limit=10`)
    if (res.data.tx_responses.length === 0) return null
    else {
        return res.data.tx_responses[0].logs[0].events[6].attributes[1].value
    }
}

/**
 * Calculate the average price of fx when delegator delegate fx (as a new delegation entry)
 * @param {string} cosmosAddress - user cosmos address (fx)
 * @param {object} delegations - delegations object that store cumulative amount and average price of delegations
 * @returns {Promise} FxTransactionsData - Staking transcations data (Descending order of heights)
 */
export const calculateAveragePriceForNew = async (cosmosAddress: string, delegations: DelegationsAveragePriceInfo) => {
    const pagination_limit = 100
    // get stake transactions in all pages
    const firstPageData = await getStakeTxs(cosmosAddress, 0, pagination_limit, "ASC")
    // return null if no delegation tx
    if (firstPageData.tx_responses.length === 0) return null
    //const lastPage = Math.ceil(Number(firstPageData.pagination.total) / 100) //pagination is now null
    const lastPage = Math.ceil(Number(1) / 100)
    const txsDataPromises: Promise<FxTransactionsData>[] = []
    const txsResponses: TxResponse[][] = []
    txsResponses.push(firstPageData.tx_responses)
    let page = 1
    //get transcations in all pages
    while (page < lastPage) {
        const offset = page * pagination_limit
        const nextPageData = getStakeTxs(cosmosAddress, offset, pagination_limit, "ASC")
        txsDataPromises.push(nextPageData)
        page++
    }
    const txsData = await Promise.all(txsDataPromises)
    txsData.forEach(txData => {
        txsResponses.push(txData.tx_responses)
    })

    const latestHeight = txsResponses.at(-1)?.at(-1)?.height!
    let lastTxTimestamp = txsResponses.at(-1)?.at(-1)?.timestamp!
    // get daily prices in data timestamp range
    const startInEpochSecond = Math.floor(new Date(firstPageData.tx_responses[0].timestamp.slice(0, 10)).getTime() / 1000)
    let endInEpochSecond = Math.floor(new Date(lastTxTimestamp.slice(0, 10)).getTime() / 1000)
    if (endInEpochSecond - startInEpochSecond < 86400 * 90) endInEpochSecond = startInEpochSecond + 86400 * 91
    const priceRangeResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/fx-coin/market_chart/range?vs_currency=usd&from=${startInEpochSecond}&to=${endInEpochSecond}`)
    const priceRange: PriceChart = priceRangeResponse.data

    txsResponses.forEach(txsResponse => {
        txsResponse.forEach((tx: TxResponse) => {
            const message = tx.tx.body.messages[0]
            const txType = message['@type']
            if (txType === '/cosmos.staking.v1beta1.MsgDelegate') {
                const validator = message.validator_address
                const amount = Big(message.amount.amount)
                const txTimeEpochSecond = Math.floor(new Date(tx.timestamp.slice(0, 10)).getTime() / 1000)
                const priceIndex = (txTimeEpochSecond - startInEpochSecond) / 86400
                const price = Big(priceRange.prices[priceIndex][1])

                if (delegations.delegatedValidators[validator]) {
                    const prevAveragePrice = Big(delegations.delegatedValidators[validator].averagePrice)
                    const prevAmount = Big(delegations.delegatedValidators[validator].amount)
                    delegations.delegatedValidators[validator].averagePrice = prevAmount.mul(prevAveragePrice).add(amount.mul(price)).div(prevAmount.add(amount)).toString()
                    delegations.delegatedValidators[validator].amount = prevAmount.add(amount).toString()
                } else {
                    delegations.delegatedValidators[validator] = {
                        amount: amount.toString(),
                        averagePrice: price.toString()
                    }
                }
            } else if (txType === '/cosmos.staking.v1beta1.MsgBeginRedelegate') {
                const validator_src_address = message.validator_src_address!
                const validator_dst_address = message.validator_dst_address!
                const amount = Big(message.amount.amount)
                const txTimeEpochSecond = Math.floor(new Date(tx.timestamp.slice(0, 10)).getTime() / 1000)
                const priceIndex = (txTimeEpochSecond - startInEpochSecond) / 86400
                const price = new Big(priceRange.prices[priceIndex][1])

                //substract the amount from src address, the address should exist
                if (!delegations.delegatedValidators[validator_src_address]) throw new Error("validator_src_address missing")
                delegations.delegatedValidators[validator_src_address].amount = Big(delegations.delegatedValidators[validator_src_address].amount).sub(amount).toString()
                if (delegations.delegatedValidators[validator_src_address].amount === "0") delete delegations.delegatedValidators[validator_src_address]

                if (delegations.delegatedValidators[validator_dst_address]) {
                    const prevAveragePrice = Big(delegations.delegatedValidators[validator_dst_address].averagePrice)
                    const prevAmount = Big(delegations.delegatedValidators[validator_dst_address].amount)
                    delegations.delegatedValidators[validator_dst_address].averagePrice = prevAmount.mul(prevAveragePrice).add(amount.mul(price)).div(prevAmount.add(amount)).toString()
                    delegations.delegatedValidators[validator_dst_address].amount = prevAmount.add(amount).toString()
                } else {
                    delegations.delegatedValidators[validator_dst_address] = {
                        amount: amount.toString(),
                        averagePrice: price.toString()
                    }
                }
            } else if (txType === '/cosmos.staking.v1beta1.MsgUndelegate') {
                const validator = message.validator_address
                const amount = Big(message.amount.amount)

                if (!delegations.delegatedValidators[validator]) throw new Error("validator_src_address missing")
                delegations.delegatedValidators[validator].amount = Big(delegations.delegatedValidators[validator].amount).sub(amount).toString()
                if (delegations.delegatedValidators[validator].amount === "0") delete delegations.delegatedValidators[validator]
            }
        })
    })
    delegations.height = Number(latestHeight)
    return delegations
}

/**
 * Calculate the average price of fx based on existing delegations.
 * @param cosmosAddress A given fx address
 * @param delegations A DelegationsAveragePriceInfo object
 */
export const calculateAveragePrice = async (cosmosAddress: string, delegations: DelegationsAveragePriceInfo) => {
    const pagination_limit = 10

    // get stake transactions in all pages (in descending order)
    const firstPageData = await getStakeTxs(cosmosAddress, 0, pagination_limit, "DESC");

    // return if no delegation tx
    if (firstPageData.tx_responses.length === 0) return null

    const txsResponses: TxResponse[][] = []
    txsResponses.push(firstPageData.tx_responses)
    let page = 1
    //keep looking for next page txs if the lowest height among fetched txs is higher than recorded height in delegations
    while (Number(txsResponses.at(-1)?.at(-1)?.height) > delegations.height) {
        const offset = pagination_limit * page
        const nextPageData = await getStakeTxs(cosmosAddress, offset, pagination_limit, "DESC")
        txsResponses.push(nextPageData.tx_responses)
        page++
    }
    const latestHeight = txsResponses.at(0)?.at(0)?.height!
    let earliestTxTimestamp = txsResponses.at(-1)?.at(-1)?.timestamp!
    // get daily prices in data timestamp range
    const startInEpochSecond = Math.floor(new Date(earliestTxTimestamp.slice(0, 10)).getTime() / 1000)
    let endInEpochSecond = Math.floor(new Date(txsResponses[0][0].timestamp.slice(0, 10)).getTime() / 1000)
    if (endInEpochSecond - startInEpochSecond < 86400 * 90) endInEpochSecond = startInEpochSecond + 86400 * 91
    const priceRangeResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/fx-coin/market_chart/range?vs_currency=usd&from=${startInEpochSecond}&to=${endInEpochSecond}`)
    const priceRange: PriceChart = priceRangeResponse.data

    for (let i = txsResponses.length - 1; i >= 0; i--) {
        for (let j = txsResponses[i].length - 1; j >= 0; j--) {
            if (i === txsResponses.length - 1 && (Number(txsResponses[i][j].height) <= delegations.height)) continue

            const tx = txsResponses[i][j]
            const message = tx.tx.body.messages[0]
            const txType = message['@type']

            if (txType === '/cosmos.staking.v1beta1.MsgDelegate') {
                const validator = message.validator_address
                const amount = Big(message.amount.amount)
                const txTimeEpochSecond = Math.floor(new Date(tx.timestamp.slice(0, 10)).getTime() / 1000)
                const priceIndex = (txTimeEpochSecond - startInEpochSecond) / 86400
                const price = Big(priceRange.prices[priceIndex][1])
                if (delegations.delegatedValidators[validator]) {
                    const prevAveragePrice = Big(delegations.delegatedValidators[validator].averagePrice)
                    const prevAmount = Big(delegations.delegatedValidators[validator].amount)
                    delegations.delegatedValidators[validator].averagePrice = prevAmount.mul(prevAveragePrice).add(amount.mul(price)).div(prevAmount.add(amount)).toString()
                    delegations.delegatedValidators[validator].amount = prevAmount.add(amount).toString()
                } else {
                    delegations.delegatedValidators[validator] = {
                        amount: amount.toString(),
                        averagePrice: price.toString()
                    }
                }
            } else if (txType === '/cosmos.staking.v1beta1.MsgBeginRedelegate') {
                const validator_src_address = message.validator_src_address!
                const validator_dst_address = message.validator_dst_address!
                const amount = Big(message.amount.amount)
                const txTimeEpochSecond = Math.floor(new Date(tx.timestamp.slice(0, 10)).getTime() / 1000)
                const priceIndex = (txTimeEpochSecond - startInEpochSecond) / 86400
                const price = new Big(priceRange.prices[priceIndex][1])

                //substract the amount from src address, the address should exist
                if (!delegations.delegatedValidators[validator_src_address]) throw new Error("validator_src_address missing")
                delegations.delegatedValidators[validator_src_address].amount = Big(delegations.delegatedValidators[validator_src_address].amount).sub(amount).toString()
                if (delegations.delegatedValidators[validator_src_address].amount === "0") delete delegations.delegatedValidators[validator_src_address]

                if (delegations.delegatedValidators[validator_dst_address]) {
                    const prevAveragePrice = Big(delegations.delegatedValidators[validator_dst_address].averagePrice)
                    const prevAmount = Big(delegations.delegatedValidators[validator_dst_address].amount)
                    delegations.delegatedValidators[validator_dst_address].averagePrice = prevAmount.mul(prevAveragePrice).add(amount.mul(price)).div(prevAmount.add(amount)).toString()
                    delegations.delegatedValidators[validator_dst_address].amount = prevAmount.add(amount).toString()
                } else {
                    delegations.delegatedValidators[validator_dst_address] = {
                        amount: amount.toString(),
                        averagePrice: price.toString()
                    }
                }
            } else if (txType === '/cosmos.staking.v1beta1.MsgUndelegate') {
                const validator = message.validator_address
                const amount = Big(message.amount.amount)

                if (!delegations.delegatedValidators[validator]) throw new Error("validator_src_address missing")
                delegations.delegatedValidators[validator].amount = Big(delegations.delegatedValidators[validator].amount).sub(amount).toString()
                if (delegations.delegatedValidators[validator].amount === "0") delete delegations.delegatedValidators[validator]
            }

        }
    }

    delegations.height = Number(latestHeight)
    return delegations

}