import { useAppSelector } from "../ReduxHooks";
import { LiquidityPositions, LPTokens } from "./tokensReducer";

export const useGetAllLpTokensRedux = (): LPTokens | null => {
    const result = useAppSelector((state) => state.tokens.lpTokens)!; //assert
    return result;
}

export const useGetLiquidityPositionsRedux = (): LiquidityPositions | null => {
    const result = useAppSelector((state) => state.tokens.liquidityPositions);
    return result;
}
