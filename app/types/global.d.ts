import { LiquidityPosition } from "../state/tokens/tokensReducer";
import { FarmPosition } from "../state/liquidityFarms/farmReducer";

export { }

declare global {

    interface Window {
        Buffer: any;
    }

    interface TokenData {
        id: string;
        name: string;
        symbol: string;
        logoUrl?: string;
        priceUSD?: number;
        explorers?: string[];
    }

    //==================Related to Liquidity Positions==================
    //LiquidityPosition interface from tokensReducer.ts
    interface UpdatedLiquidityPositions {
        userAddress: string | null;
        liquidityPositions: LiquidityPosition[] | null
    }

    interface PoolData {
        id: string,
        position: string;
        positionAddress: string;
        liquidityTokenBalance: string;
        token0Address: string
        token0Symbol: string;
        token0LogoUrl: string | undefined;
        token0PooledAmount: string;
        token1Address: string;
        token1Symbol: string;
        token1LogoUrl: string | undefined;
        token1PooledAmount: string;
        liquidityValue: string;
        depositedLPFarm: string;
        lpTokenValue: string;
        rewardValue: string
        farmTotalValue: string;
        liquidityValueHistorical: string;
        unrealizedGL_P: string;
        unrealizedGL_V: string;
    }

    interface PoolGroup {
        group: string;
        headings: string[];
        data: PoolData[];
    }

    interface PoolInfo {
        result: {
            pool: {
                not_bonded_tokens: string;
                bonded_tokens: string;
            }
        }
    }
    //=============================================================

    //==================Related to Farm Positions==================
    //FarmPosition interface from FarmReducer.ts
    interface UpdatedFarmPositions {
        userAddress: string | null;
        farms: FarmPosition[] | null
    }

    interface FarmData {
        id: string;
        farmName: string;
        deposit: string;
        rewards: string;
        value: string;
        token0Symbol: string;
        token0LogoUrl: string | undefined;
        token1Symbol: string;
        token1LogoUrl: string | undefined;
        rewardSymbol: string;
        rewardLogoUrl: string;
        rewardValue: string;
        note?: string,
        active: boolean,
        lpTokenValue: string;
    }

    interface FarmGroup {
        group: string;
        headings: string[];
        data: FarmData[];
    }
    //=============================================================

    //========================GraphQL types========================
    interface LiquidityAdds {
        data: {
            mints: [
                {
                    amount0: string,
                    amount1: string,
                    amountUSD: string,
                    pair: {
                        id: string,
                        token0: {
                            name: string,
                            symbol: string
                        },
                        token1: {
                            name: string,
                            symbol: string
                        },
                    },
                    timestamp: string,
                }
            ]
        }
    }

    interface LiquidityBurns {
        data: {
            burns: [
                {
                    amount0: string,
                    amount1: string,
                    amountUSD: string,
                    pair: {
                        id: string,
                        token0: {
                            name: string,
                            symbol: string
                        },
                        token1: {
                            name: string,
                            symbol: string
                        },
                    },
                    timestamp: string,
                }
            ]
        }
    }
    //=============================================================

    //======================Delegations Types======================
    interface DelegatorTotalRewardsRes {
        result: {
            rewards: [] | [
                {
                    validator_address: string,
                    reward: [
                        {
                            denom: string,
                            amount: string,
                        }
                    ]
                }
            ],
            total: [] | [
                {
                    denom: string,
                    amount: string,
                }
            ]
        }
    }

    interface ValidatorsOfDelegatorRes {
        delegator: string;
        result: {
            validators: string[];
        }
    }

    interface DelegatorDelegationsRes {
        delegator: string;
        result: {
            delegation_responses: [] | [
                {
                    delegation: {
                        delegator_address: string,
                        validator_address: string,
                        shares: string
                    },
                    balance: {
                        denom: string,
                        amount: string
                    }
                }
            ],
            pagination: {
                next_key: string | null,
                total: string
            }
        }
    }

    interface ValidatorsInfoFullRes {
        delegator: string;
        result: {
            validators: [] | [
                {
                    operator_address: string,
                    consensus_pubkey: {
                        type_url: string,
                        value: string
                    },
                    jailed: boolean,
                    status: string,
                    tokens: string,
                    delegator_shares: string,
                    description: {
                        moniker: string,
                        identity: string,
                        website: string,
                        security_contact: string,
                        details: string
                    },
                    unbonding_height: string,
                    unbonding_time: string,
                    commission: {
                        commission_rates: {
                            rate: string,
                            max_rate: string,
                            max_change_rate: string
                        },
                        update_time: string
                    },
                    min_self_delegation: string
                }
            ],
            pagination: {
                next_key: string | null,
                total: string
            }
        }
    }

    interface ValidatorCommissionRes {
        result: {
            commission: {
                commission: [
                    {
                        denom: string,
                        amount: string
                    }
                ]
            }
        }
    }

    interface ValidatorOutstandingRewardsRes {
        result: {
            rewards: {
                rewards: [
                    {
                        denom: string,
                        amount: string
                    }
                ]
            }
        }
    }

    interface DelegationData {
        poolInfo: PoolInfo;
        totalRewards: DelegatorTotalRewardsRes;
        delegations: DelegatorDelegationsRes;
        validatorInfo: ValidatorsInfoFullRes;
        withdrawals: TxnLogEvents;
    }

    interface ConsolidatedDelegation {
        delegations: [
            {
                validator: {
                    operator_address: string,
                    consensus_pubkey: {
                        type_url: string,
                        value: string
                    },
                    jailed: boolean,
                    status: string,
                    tokens: string,
                    delegator_shares: string,
                    description: {
                        moniker: string,
                        identity: string,
                        website: string,
                        security_contact: string,
                        details: string
                    },
                    unbonding_height: string,
                    unbonding_time: string,
                    commission: {
                        commission_rates: {
                            rate: string,
                            max_rate: string,
                            max_change_rate: string
                        },
                        update_time: string
                    },
                    min_self_delegation: string
                },
                delegation: {
                    delegation: {
                        delegator_address: string,
                        validator_address: string,
                        shares: string
                    },
                    balance: {
                        denom: string,
                        amount: string,
                        value: string
                    }
                },
                rewards: {
                    validator_address: string,
                    reward: [
                        {
                            denom: string,
                            amount: string,
                            logoURI: string,
                            value: string,
                        }
                    ]
                }
            }
        ];
        withdrawals: TxnLogEvents;
        poolInfo: PoolInfo;
        totalDelegationRewards: [] | [
            {
                denom: string,
                amount: string,
                value: string
            }
        ]
    }
    //=============================================================


    interface TxnLogEvent {
        type: string;
        attributes: [
            {
                key: string;
                value: string;
            }
        ];
    }

    interface TxnLogEvents {
        result: [] | TxnLogEvent[]
    }

    //need to type the arrays
    interface FxEvmEvents {
        txs: [],
        tx_responses: [],
        pagination: {
            next_key: string | null,
            total: string
        }
    }

    interface NodeTxnEventsRes {
        result: {
            txs: [
                {
                    code: number;
                    codespace: string;
                    data: {
                        data: [
                            {
                                msg_type: string
                            }
                        ]
                    };
                    events: [
                        {
                            attributes: [
                                {
                                    index: boolean;
                                    key: string;
                                    value: string;
                                }
                            ]
                            type: string;
                        }
                    ];
                    gas_used: number;
                    gas_wanted: number;
                    height: number;
                    info: string;
                    logs: [
                        {
                            events: [
                                {
                                    type: string;
                                    attributes: [
                                        {
                                            key: string;
                                            value: string
                                        }
                                    ]
                                }
                            ]
                        }
                    ];
                    raw_log: string;
                    timestamp: string;
                    tx: {
                        "@type": string;
                        body: {
                            messages: [
                                {
                                    "@type": string;
                                    delegator_address: string;
                                    validator_address: string;
                                }
                            ];
                            memo: string;
                            timeout_height: string;
                            extension_options: [];
                            non_critical_extension_options: [];
                        };
                        auth_info: {
                            signer_infos: [
                                {
                                    public_key: {
                                        "@type": string;
                                        key: string;
                                    };
                                    mode_info: {
                                        single: {
                                            mode: string;
                                        }
                                    };
                                    sequence: string;
                                }
                            ];
                            fee: {
                                amount: [
                                    {
                                        denom: string;
                                        amount: string;
                                    }
                                ];
                                gas_limit: string;
                                payer: string;
                                granter: string;
                            }
                        };
                        signatures: string[];
                    },
                    txhash: string;
                }
            ]
        }
    }

    interface RestTxnEventsRes {
        result: {
            txs: [
                {
                    body: {
                        messages: [
                            {
                                "@type": string;
                                delegator_address: string;
                                validator_address: string;
                            }
                        ],
                        memo: string;
                        timeout_height: string;
                        extension_options: [];
                        non_critical_extension_options: [];
                    };
                    auth_info: {
                        signer_infos: [
                            {
                                public_key: {
                                    "@type": string;
                                    key: string;
                                };
                                mode_info: {
                                    single: {
                                        mode: string;
                                    }
                                };
                                sequence: string;
                            }
                        ];
                        fee: {
                            amount: [
                                {
                                    denom: string;
                                    amount: string;
                                }
                            ];
                            gas_limit: string;
                            payer: string;
                            granter: string;
                        }
                    };
                    signatures: string[];
                }
            ];
            tx_responses: [
                {
                    height: string;
                    txhash: string;
                    codespace: string;
                    code: number;
                    data: string;
                    raw_log: string;
                    logs: [
                        {
                            msg_index: number;
                            log: string;
                            events: [
                                {
                                    type: string;
                                    attributes: [
                                        {
                                            key: string;
                                            value: string;
                                        }
                                    ];
                                }
                            ];
                        }
                    ];
                    info: string;
                    gas_wanted: string;
                    gas_used: string;
                    tx: {
                        "@type": string;
                        body: {
                            messages: [
                                {
                                    "@type": string;
                                    delegator_address: string;
                                    validator_address: string;
                                }
                            ];
                            memo: string;
                            timeout_height: string;
                            extension_options: [];
                            non_critical_extension_options: [];
                        };
                        auth_info: {
                            signer_infos: [
                                {
                                    public_key: {
                                        "@type": string;
                                        key: string;
                                    };
                                    mode_info: {
                                        single: {
                                            mode: string;
                                        }
                                    };
                                    sequence: string;
                                }
                            ];
                            fee: {
                                amount: [
                                    {
                                        denom: string;
                                        amount: string;
                                    }
                                ];
                                gas_limit: string;
                                payer: string;
                                granter: string;
                            }
                        };
                        signatures: string[];
                    };
                    timestamp: string;
                    events: [
                        {
                            type: string;
                            attributes: [
                                {
                                    key: string;
                                    value: string;
                                    index: boolean;
                                }
                            ];
                        }
                    ];
                }
            ];
            pagination: {
                next_key: string | null;
                total: string
            };
        }
    }

}