export const defaultPoolRow: PoolData[] = [{
    id: "",
    position: "",
    positionAddress: "",
    liquidityTokenBalance: "0",
    token0Address: "",
    token0Symbol: "",
    token0LogoUrl: "",
    token0PooledAmount: "0",
    token1Address: "",
    token1Symbol: "",
    token1LogoUrl: "",
    token1PooledAmount: "0",
    liquidityValue: "0",
    depositedLPFarm: "0",
    lpTokenValue: "0",
    rewardValue: "0",
    farmTotalValue: "0",
    liquidityValueHistorical: "0",
    unrealizedGL_P: "0",
    unrealizedGL_V: "0",
}]

export const defaultFarmRow: FarmData[] = [{
    id: "",
    farmName: "",
    deposit: "0",
    rewards: "0",
    value: "0",
    token0Symbol: "",
    token0LogoUrl: "",
    token1Symbol: "",
    token1LogoUrl: "",
    rewardSymbol: "",
    rewardLogoUrl: "",
    rewardValue: "0",
    active: true,
    lpTokenValue: "0",
}]

export const defaultDelegations: DelegationData = {
    poolInfo: {
        result: {
            pool: {
                not_bonded_tokens: "0",
                bonded_tokens: "0",
            }
        }
    },
    totalRewards: {
        result: {
            rewards: [],
            total: []
        }
    },
    delegations: {
        delegator: "",
        result: {
            delegation_responses: [],
            pagination: {
                next_key: null,
                total: "0"
            }
        }
    },
    validatorInfo: {
        delegator: "",
        result: {
            validators: [],
            pagination: {
                next_key: null,
                total: "0"
            }
        }

    },
    withdrawals: {
        result: []
    }
}