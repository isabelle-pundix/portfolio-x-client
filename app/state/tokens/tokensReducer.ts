import { createReducer } from "@reduxjs/toolkit";
import { updateAllLpTokens, updateLiquidityPositions, clearLiquidityPositions } from "./tokensActions";

export interface LPTokens {
    data: {
        pairs: [
            {
                id: string;
                totalSupply: string;
                volumeUSD: string;
                token0: TokenData;
                token1: TokenData;
            }
        ]
    }
}

export interface LiquidityPosition {
    liquidityTokenBalance: string;
    pair: {
        id: string;
        totalSupply: string;
        token0: TokenData;
        token1: TokenData;
        reserve0: string;
        reserve1: string;
    }
}

export interface LiquidityPositions {
    data: {
        users: [
            {
                id: string;
                liquidityPositions: LiquidityPosition[]
            }
        ]
    }
}

export interface TokensState {
    lpTokens: LPTokens | null;
    liquidityPositions: LiquidityPositions | null;
}

const initialState: TokensState = {
    lpTokens: null,
    liquidityPositions: null,
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(updateAllLpTokens, (state, action) => {
            state.lpTokens = action.payload
        })
        .addCase(updateLiquidityPositions, (state, action) => {
            state.liquidityPositions = action.payload
        })
        .addCase(clearLiquidityPositions, (state) => {
            state.liquidityPositions = null
        })
)