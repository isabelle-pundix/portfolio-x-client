import { createAction } from "@reduxjs/toolkit";
import { FxswapFarmMetric, Metrics } from "./metricsReducer";

export const updateMetrics = createAction<Metrics>("metrics/updateMetrics");
export const updateFxswapFarmMetrics = createAction<FxswapFarmMetric>("metrics/updateFxswapFarmMetric");
export const clearMetrics = createAction("metrics/resetMetrics");