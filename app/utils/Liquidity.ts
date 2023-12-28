import { Constants } from "../constants";
import axios from "axios";
import { TokensState } from "../state/tokens/tokensReducer";
import {getSingleTokenPrice, getTokenMetaData2} from "./Token";
import { PricesState } from "../state/prices/pricesSlice";

const subgraphEndpoint = Constants.Endpoint.FXSWAP_MAINNET_SUBGRAPH;

/**
 * Given the Token state object, replaces each Token object in Liquidity Positions with
 * an updated Token instance: Updates the logo and the price of each Token object.
 * If there are no liquidity positions in the Tokens state, returns null.
 * @param _tokensState The Tokens state in Redux
 * @param _pricesState The Prices state in Redux
 * @returns UpdatedLiquidityPositions An UpdatedLiquidityPositions object containing user address and liquidity positions data
 */
export const retrieveLiquidityPosMeta = (_tokensState: TokensState, _pricesState: PricesState) => {
    if (_tokensState.liquidityPositions != null && _tokensState.liquidityPositions.data.users.length && _pricesState != null) {
        let _liquidityPositionsUpdated =
            _tokensState.liquidityPositions.data.users[0].liquidityPositions.map(
                (liquidityPosition) => ({
                    ...liquidityPosition,
                    pair: {
                        ...liquidityPosition.pair,
                        token0: getSingleTokenPrice(_pricesState, getTokenMetaData2(liquidityPosition.pair.token0)),
                        token1: getSingleTokenPrice(_pricesState, getTokenMetaData2(liquidityPosition.pair.token1)),
                    }
                })
            );
        const liquidityPositionsUpdated: UpdatedLiquidityPositions = {
            userAddress: _tokensState.liquidityPositions.data.users[0].id,
            liquidityPositions: _liquidityPositionsUpdated,
        }
        console.log("liquidity pos", liquidityPositionsUpdated)
        return liquidityPositionsUpdated
    } else {
        return null
    }
}

/**
 * Runs a GraphQL query to the FxSwap Mainnet Subgraph, and fetches all LP tokens on FxSwap
 * @returns A GraphQL response
 */
export const getLPTokens = async () => {
    try {
        return await axios.post(subgraphEndpoint,
            {
                headers: {"Content-Type": "application/json"},
                query: `
                        query AllLpTokens {
                            pairs {
                                id
                                totalSupply
                                volumeUSD
                                token0 {
                                    id
                                    name
                                    symbol
                                }
                                token1 {
                                    id
                                    name
                                    symbol
                                }
                            }
                        }
                        `,
            }
        )
    } catch (error) {
        console.error("There was an error with the request for LP tokens");
        return null
    }
}

/**
 * Runs a GraphQL query to the FxSwap Mainnet Subgraph, and fetchs a user's liquidity positions
 * @param addr A 0x address
 * @returns A GrpahQL response
 */
export const getLiquidityPositions = async (addr: string) => {
    const graphQuery = `
        query LiquidityPositions {
            users(where: {id: "${addr.toLowerCase()}"}) {
              id
              liquidityPositions {
                liquidityTokenBalance
                pair {
                  id
                  totalSupply
                  token0 {
                    name
                    id
                    symbol
                  }
                  token1 {
                    name
                    id
                    symbol
                  }
                  reserve0
                  reserve1
                }
              }
            }
          }
        `
    try {
        return await axios.post(subgraphEndpoint,
            {
                headers: {"Content-Type": "application/json"},
                query: graphQuery
            }
        )
    } catch (error) {
        console.error("There was an error with the request for Liquidity Positions");
        return null
    }
}

/**
 * Runs a GraphQL query to the FxSwap Mainnet Subgraph, and fetchs a user's liquidity additions
 * @param addr A 0x address
 * @returns 
 */
export const getLiquidityAdditions = async (addr: string) => {
    const graphQuery = `
        query LiquidityAdds {
            mints(
            orderBy: timestamp
            where: {to: "${addr}"}
            orderDirection: desc
            ) {
            amount0
            amount1
            amountUSD
            pair {
                token0 {
                name
                symbol
                }
                token1 {
                name
                symbol
                }
                id
            }
            timestamp
            }
        }
    `
    try {
        const res = await axios.post(subgraphEndpoint,
            {
                headers: { "Content-Type": "application/json" },
                query: graphQuery
            }
        );
        if (typeof res.data.errors === "undefined") {
            return res.data as LiquidityAdds
        } else {
            console.error("The provided address is invalid, defaulting subgraph results to null")
            return null
        }
    } catch (error) {
        console.error("There was an error with the request for Liquidity Additions");
        return null
    }
}

/**
 * Runs a GraphQL query to the FxSwap Mainnet Subgraph, and fetchs a user's liquidity burns
 * @param addr A 0x address
 * @returns 
 */
export const getLiquidityBurns = async (addr: string) => {
    const graphQuery = `
        query BurnsBasedOnUser {
            burns(
            where: {sender: "${addr}"}
            orderBy: timestamp
            orderDirection: desc
            ) {
            amount0
            amount1
            amountUSD
            pair {
                token0 {
                name
                symbol
                }
                token1 {
                name
                symbol
                }
                id
            }
            timestamp
            }
        }
    `
    try {
        const res = await axios.post(subgraphEndpoint,
            {
                headers: { "Content-Type": "application/json" },
                query: graphQuery
            }
        );
        if (typeof res.data.errors === "undefined") {
            return res.data as LiquidityBurns
        } else {
            console.error("The provided address is invalid, defaulting subgraph results to null")
            return null
        }
    } catch (error) {
        console.error("There was an error with the request for Liquidity Burns");
        return null
    }
}