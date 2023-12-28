import { Constants } from "@/app/constants";
import { FxswapFarmMetric } from "../state/metrics/metricsReducer";
import axios from "axios";
import { UNISWAPV3_MAINNET_SUBGRAPH } from "../constants/Endpoints";

const uniswapSubgraph = UNISWAPV3_MAINNET_SUBGRAPH;

/**
 * Retrieves liquidity farms metrics' from resource
 * @returns An FxswapFarmMetric object
 */
export const getFxSwapFarmMetrics = async () => {
    try {
        const res = await axios.get(Constants.Endpoint.FXSWAPFARMMETRICS_ENDPOINT);
        console.log("Res: ", res);
        return res.data as FxswapFarmMetric
    } catch (error) {
        console.log(error);
        return null
    }
}

export const getBaklavaVaultMetrics = async () => {
    try {
        const res = await axios.get(Constants.Endpoint.BAKLAVAVAULTMETRICS_ENDPOINT);
        console.log("Res :", res);
        return res.data; 
    } catch (error) {
        console.log(error);
        return null;
    }
}

export interface UniswapSubgraphPoolData {
    data: {
        pool: {
            token0: {
                symbol: string,
                name: string,
                id: string,
                decimals: string,
            }
            token1: {
                symbol: string,
                name: string,
                id: string,
                decimals: string,
            }
            totalValueLockedUSD: string,
            totalValueLockedToken0: string,
            totalValueLockedToken1: string,
            txCount: string,
        }
    }
}

/**
 * Retrieves the metric for Fx/Eth pool on Uniswap V3
 * @returns A UniswapSubgraphPoolData object
 */
export const getUniswapV3FxEthMetrics = async () => {
    try {
        const res = await axios.post(uniswapSubgraph,
            {
                headers: { "Content-Type": "application/json" },
                query: `
                    {
                        pool(id: "${Constants.Address.UNISWAPV3_FXETH_POOL_ADDRESS}") {
                        token0 {
                            symbol
                            name
                            id
                            decimals
                        }
                        token1 {
                            symbol
                            name
                            id
                            decimals
                        }
                        totalValueLockedUSD
                        totalValueLockedToken0
                        totalValueLockedToken1
                        txCount
                        }
                    }
                `,
            }
        );
        return res.data as UniswapSubgraphPoolData
    } catch (error) {
        console.error("There was an error with the request for UniswapV3 Subgraph");
        console.log(error);
        return null
    }
}

/**
 * Retrieves the metric for Fx/Usdt pool on Uniswap V3
 * @returns A UniswapSubgraphPoolData object
 */
export const getUniswapV3FxUsdtMetrics = async () => {
    try {
        const res = await axios.post(uniswapSubgraph,
            {
                headers: { "Content-Type": "application/json" },
                query: `
                    {
                        pool(id: "${Constants.Address.UNISWAPV3_FXUSDT_POOL_ADDRESS}") {
                        token0 {
                            symbol
                            name
                            id
                            decimals
                        }
                        token1 {
                            symbol
                            name
                            id
                            decimals
                        }
                        totalValueLockedUSD
                        totalValueLockedToken0
                        totalValueLockedToken1
                        txCount
                        }
                    }
                `,
            }
        );
        return res.data as UniswapSubgraphPoolData
    } catch (error) {
        console.error("There was an error with the request for UniswapV3 Subgraph");
        return null
    }
}