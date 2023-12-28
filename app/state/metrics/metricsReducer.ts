import { createReducer } from "@reduxjs/toolkit";
import { Constants } from "@/app/constants";
import { updateFxswapFarmMetrics, updateMetrics, clearMetrics } from "./metricActions";

export interface FxswapFarmMetric {
    AllData: {
        _id: string;
        tvl: {
            [index: number | string]: string;
        },
        apr: {
            [index: number | string]: string;
        },
        apyDaily: {
            [index: number | string]: string;
        },
        lpTokenValue: {
            [index: number | string]: string;
        }
    }
}

export interface Metrics {
    fxswap: FxswapFarmMetric;
}

export interface MetricsState {
    metrics: Metrics
}

const initialState: MetricsState = {
    metrics: Constants.Farms.FXFarmsMetricsDefault
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(updateFxswapFarmMetrics, (state, action) => {
            state.metrics.fxswap = action.payload
        })
        .addCase(updateMetrics, (state, action) => {
            state.metrics = action.payload
        })
        .addCase(clearMetrics, (state) => {
            return initialState
        })
)