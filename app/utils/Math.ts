import JSBI from "jsbi";
/**
 * Calculates the amount of the given token in the liquidity pool.
 * This is also the claimable amount of the given token from the liquidity pool
 * @param lpPoolBalance The balance of the LP token.
 * @param tokenReserve The reserves of the given token.
 * @param lpTotalSupply The total supply of the LP token.
 * @returns number The amount of the given token in the liquidity pool.
 */
export const getTokenPooledAmount = (lpPoolBalance: string, tokenReserve: string, lpTotalSupply: string): number => {
    // ( (lpPoolBalance * tokenReserve) / lpTotalSupply );
    if (parseFloat(lpTotalSupply) === 0) {
        return 0
    }
    let result: number = 0;
    const numLpPoolBalance = Number(lpPoolBalance);
    const numTokenReserve = Number(tokenReserve);
    const numLpTotalSupply = Number(lpTotalSupply);
    if (
        numLpPoolBalance > Number.MAX_SAFE_INTEGER
        || numTokenReserve > Number.MAX_SAFE_INTEGER
        || numLpTotalSupply > Number.MAX_SAFE_INTEGER
    ) {
        result = JSBI.toNumber(JSBI.divide(
            JSBI.multiply(
                JSBI.BigInt(Math.round(numLpPoolBalance)),
                JSBI.BigInt(Math.round(numTokenReserve))
            ),
            JSBI.BigInt(Math.round(numLpTotalSupply))
        ))
    } else {
        result = ((numLpPoolBalance * numTokenReserve) / numLpTotalSupply)
    }

    return result
}

/**
 * Calculates the amount of the given Token in USD
 * @param tokenAmount The amount of the token
 * @param token The instance of the token
 * @returns A number value. If token does not have a price, returns null
 */
export const getTokenValueInUSD = (tokenAmount: number, token: TokenData): number | null => {
    if (!token.priceUSD) {
        return null
    }
    return tokenAmount * token.priceUSD;
}