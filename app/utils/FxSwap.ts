import {LiquidityPosition} from "../state/tokens/tokensReducer";
import {FarmPosition} from "../state/liquidityFarms/farmReducer";
import {getTokenPooledAmount} from "./Math";
import {Constants} from "../constants";

/**
 * Appends the symbols of two tokens, for example: FX-USDT
 * @param _token0 Symbol of token in first position
 * @param _token1 Symbol of token in second position
 * @returns string The name of the liquidity pool
 */
export const getPoolPosition = (_token0: TokenData, _token1: TokenData) => {
    return _token0.symbol + "-" + _token1.symbol
}

/**
 * Calculates the value (in USD) of the liquidity position
 * @param _pooledToken0 The amount of token0 in the liquidity pool
 * @param _token0Price The price of token0
 * @param _pooledToken1 The amount of token1 in the liquidity pool
 * @param token1Price The price of token1
 * @returns number The value of the liquidity position
 */
export const getPositionLiquidityValue = (_pooledToken0: number, _token0Price: number, _pooledToken1: number, token1Price: number) => {
    return (_pooledToken0 * _token0Price) + (_pooledToken1 * token1Price)
}

/**
 * Converts an array of LiquidityPosition to an array of PoolData.
 * If there are no liquidity positions, returns null.
 * @param _liquidityPositions A LiquidityPositions array
 * @returns PoolData[] An array of PoolData
 */
export const getPoolData = (_liquidityPositions: LiquidityPosition[]): PoolData[] => {
    let poolDataArray: PoolData[] = [];
    _liquidityPositions.forEach((liquidityPosition) => {
        const token0PooledAmount_ = getTokenPooledAmount(
            liquidityPosition.liquidityTokenBalance,
            liquidityPosition.pair.reserve0,
            liquidityPosition.pair.totalSupply
        );
        const token1PooledAmount_ = getTokenPooledAmount(
            liquidityPosition.liquidityTokenBalance,
            liquidityPosition.pair.reserve1,
            liquidityPosition.pair.totalSupply
        );
        //liquidityTokenBalance, token0PooledAmount, token1PooledAmount, liquidityValue should be maintained
        //as string type to avoid any scientific notation representations (e.g. 9.999e-8) and infinite trailing zeroes.
        //These props can be coerced into Number type when doing calculations.
        const poolData: PoolData = {
            id: liquidityPosition.pair.id,
            position: getPoolPosition(liquidityPosition.pair.token0, liquidityPosition.pair.token1),
            positionAddress: liquidityPosition.pair.id,
            liquidityTokenBalance: liquidityPosition.liquidityTokenBalance,
            token0Address: liquidityPosition.pair.token0.id,
            token0Symbol: liquidityPosition.pair.token0.symbol,
            token0LogoUrl: liquidityPosition.pair.token0.logoUrl,
            token0PooledAmount: token0PooledAmount_.toString(),
            token1Address: liquidityPosition.pair.token1.id,
            token1Symbol: liquidityPosition.pair.token1.symbol,
            token1LogoUrl: liquidityPosition.pair.token1.logoUrl,
            token1PooledAmount: token1PooledAmount_.toString(),
            liquidityValue: getPositionLiquidityValue(
                token0PooledAmount_,
                liquidityPosition.pair.token0.priceUSD!, //priceUSD will always be >= 0
                token1PooledAmount_,
                liquidityPosition.pair.token1.priceUSD!,
            ).toString(),
            depositedLPFarm: "0",
            lpTokenValue: "0",
            rewardValue: "0",
            farmTotalValue: "0",
            liquidityValueHistorical: "0",
            unrealizedGL_P: "0",
            unrealizedGL_V: "0",
        }
        //if all four of the following metrics are 0, do not add the datum to the result array
        if (
            Number(poolData.liquidityTokenBalance) === 0 &&
            Number(poolData.liquidityValue) === 0 &&
            Number(poolData.token0PooledAmount) === 0 &&
            Number(poolData.token1PooledAmount) === 0
        ) {
            return
        }

        poolDataArray.push(poolData);
    })
    return poolDataArray
}

/**
 * Converts an array of FarmPosition to an array of FarmData
 * @param _farmPositions A FarmPosition array
 * @param _rewardsPrice The price of the farm rewards token
 * @returns FarmData[] An array of FarmData
 */
export const getFarmData = (_farmPositions: FarmPosition[], _rewardsPrice: number): FarmData[] => {
    let farmDataArray: FarmData[] = [];
    _farmPositions.forEach((farmPosition) => {
        const farmData: FarmData = {
            id: farmPosition.id,
            farmName: farmPosition.farmName,
            deposit: farmPosition.liquidityDeposited,
            rewards: farmPosition.unclaimedRewards,
            token0Symbol: farmPosition.token0.symbol,
            token0LogoUrl: farmPosition.token0.logoUrl,
            token1Symbol: farmPosition.token1.symbol,
            token1LogoUrl: farmPosition.token1.logoUrl,
            rewardSymbol: "FX",
            rewardLogoUrl: Constants.Tokens.Logos.FX,
            rewardValue: String(Number(farmPosition.unclaimedRewards) * _rewardsPrice),
            active: farmPosition.active,
            value: String((Number(farmPosition.lpTokenValue) * Number(farmPosition.liquidityDeposited)) + (Number(farmPosition.unclaimedRewards) * _rewardsPrice)),
            lpTokenValue: farmPosition.lpTokenValue,
        }

        if ((Number(farmData.deposit) === 0 && Number(farmData.rewards) === 0)
            || (farmData.deposit === undefined && farmData.rewards === undefined)
            || !farmData.active) {
            return
        }

        farmDataArray.push(farmData);
    })
    return farmDataArray

}

/**
 * Joins the user's farm deposit amount, value, lpTokenValue, and rewardValue to the matching liquidity pool
 * This will be used to for calculating the unrealized gains/losses for liquidity positions.
 * @param poolRows A PoolData array
 * @param farmRows A FarmData array
 * @returns PoolData[] An updated PoolData array
 */
export const matchPoolAndFarm = (poolRows: PoolData[], farmRows: FarmData[]) => {
    if (poolRows.length < 1 || farmRows.length < 1 || !poolRows[0].id || !farmRows[0].id) {
        return poolRows
    }
    farmRows.forEach((farm) => {
        const pool = poolRows.filter(poolRow => poolRow.id === farm.id)[0];
        if (pool === undefined) {
            return
        }
        pool.depositedLPFarm = farm.deposit;
        pool.farmTotalValue = farm.value;
        pool.lpTokenValue = farm.lpTokenValue;
        pool.rewardValue = farm.rewardValue;
    })
    return poolRows
}

/**
 * Calculates the total liquidity value for Pools and Farm in FxSwap
 * @param _poolRows A PoolData array
 * @param _farmRows A FarmData array
 * @returns number The total liquidity value
 */
export const calcTotalValue = (_poolRows: PoolData[], _farmRows: FarmData[]): number => {
    let totalValue: number = 0;
    _poolRows.forEach((poolRow) => {
        totalValue += Number(poolRow.liquidityValue)
    })
    _farmRows.forEach((farmRow) => {
        totalValue += Number(farmRow.value)
    })

    return totalValue
}

/**
 * Calculates the historical liquidity value for each liquidity position
 * @param _poolData A PoolData[] object
 * @param _adds A LiquidityAdds object
 * @param _burns A LiquidityBurns object
 * @returns PoolData[] An updated PoolData[] array
 */
export const calcHistoricalLiquidityValue = (_poolData: PoolData[], _adds: LiquidityAdds, _burns: LiquidityBurns): PoolData[] => {
    _poolData.forEach((pool) => {
        const addsArr = _adds.data.mints.filter(i => i.pair.id === pool.id);
        const burnsArr = _burns.data.burns.filter(j => j.pair.id === pool.id);
        pool.liquidityValueHistorical = (addsArr.reduce((acc, a) => acc + parseFloat(a.amountUSD), 0)
            - burnsArr.reduce((acc, b) => acc + parseFloat(b.amountUSD), 0)).toString();
    })
    return _poolData
}

/**
 * Calculates the unrealized gains or losses, in percent and value.
 * Mutates the poolData object's unrealizedGL_P and unrealizedGL_V properties.
 * % Unreallized = (liquidityValue + farmTotalValue - liquidityValueHistorical) / liquidityValueHistorical * 100 
 * @param PoolData[] An updated PoolData[] object
 */
export const calcUnrealizedGL1 = (_poolData: PoolData[]): PoolData[] => {
    _poolData.forEach((pool) => {
        if (parseFloat(pool.liquidityValueHistorical) !== 0) {
            pool.unrealizedGL_P = ((
                parseFloat(pool.liquidityValue)
                + parseFloat(pool.farmTotalValue)
                - parseFloat(pool.liquidityValueHistorical)
            ) / parseFloat(pool.liquidityValueHistorical) * 100).toString();
            pool.unrealizedGL_V = ((
                parseFloat(pool.liquidityValue)
                + parseFloat(pool.farmTotalValue)
                - parseFloat(pool.liquidityValueHistorical)
            ) / parseFloat(pool.liquidityValueHistorical)).toString();
        } else {
            const farmDepositedValue = parseFloat(pool.depositedLPFarm) * parseFloat(pool.lpTokenValue);
            pool.unrealizedGL_P = (parseFloat(pool.rewardValue) / farmDepositedValue * 100).toString();
            pool.unrealizedGL_V = pool.rewardValue;
        }
    })
    return _poolData;
}
