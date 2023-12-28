import { createReducer } from "@reduxjs/toolkit";
import { Constants } from "../../constants";
import { clearFarms, updateFarms } from "./farmActions";

export interface FarmPosition {
    id: string;
    farmName: string;
    active: boolean;
    token0: TokenData;
    token1: TokenData;
    liquidityDeposited: string;
    lpTotalSupply?: string;
    unclaimedRewards: string;
    reserve0?: string;
    reserve1?: string;
    lpTokenValue: string;
}

export interface FarmsSingle {
    id: string;
    farmName: string;
    active: boolean;
    token0: TokenData;
    token1: TokenData;
    liquidityDeposited?: string;
    lpTotalSupply?: string;
    unclaimedRewards?: string;
    reserve0?: string;
    reserve1?: string;
    lpTokenValue?: string;
}

export interface Farms {
    userAddress?: string;
    [index: number]: FarmsSingle
}

export interface FarmsState {
    farms: Farms;
}

const initialState: FarmsState = {
    farms: Constants.Farms.FXFarms
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(updateFarms, (state, action) => {
            state.farms = action.payload
        })
        .addCase(clearFarms, (state) => {
            return initialState
        })
)