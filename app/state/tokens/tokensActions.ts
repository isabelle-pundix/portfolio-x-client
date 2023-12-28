import { createAction } from "@reduxjs/toolkit";
import { LPTokens } from "./tokensReducer";
import { LiquidityPositions } from "./tokensReducer";

export const updateAllLpTokens = createAction<LPTokens>("tokens/updateAllLpTokens");
export const updateLiquidityPositions = createAction<LiquidityPositions>("tokens/updateLiquidityPositions");
export const clearLiquidityPositions = createAction("tokens/clearLiquidityPositions");
