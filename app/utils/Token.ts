import { AxiosHeaders } from "axios";
import serveraxios from "../config/ServerAxios";
import { Constants } from "@/app/constants";
import { FarmsSingle } from "../state/liquidityFarms/farmReducer";
import { PricesState, TokenPrice } from "../state/prices/pricesSlice";
import { getFXSwapV2PairContract } from "./getContracts";
import { ethers } from "ethers";

export interface CmcResponse {
    config: any;
    data: any;
    headers: AxiosHeaders;
    request: XMLHttpRequest;
    status: number;
    statusText: string
}

/**
 * Sets the logoUrl of the token instance passed into the method.
 * Unlike, getTokenMetaData, this method does not use the CMC api.
 * @param _token The token instance to mutate
 * @returns TokenData A new token instance with a logoUrl property
 */
export const getTokenMetaData2 = (_token: TokenData) => {
    let token_ = {
        ..._token,
        logoUrl: "",
    } as TokenData;

    if (token_.symbol === "BAVA") {
        token_.logoUrl = Constants.Tokens.Logos.BAVA;
        return token_
    } else if (token_.symbol === "FXG") {
        token_.logoUrl = Constants.Tokens.Logos.FXG;
        return token_
    }

    let tokenSymbol: string;
    if (token_.symbol === "WFX" || token_.symbol === "FX-V2") {
        tokenSymbol = "FX";
    } else {
        tokenSymbol = token_.symbol;
    }

    if (tokenSymbol in Constants.Tokens.Logos) {
        const logoValue = Object.keys(Constants.Tokens.Logos).indexOf(tokenSymbol);
        token_.logoUrl = Object.values(Constants.Tokens.Logos)[logoValue];
        return token_
    } else {
        //Token has no supported logo
        token_.logoUrl = undefined;
        return token_
    }
}

/**
 * Sets the priceUSD of the token instance passed into the method.
 * @param _pricesState The prices state
 * @param _token The token instance to mutate
 * @returns TokenData A new token instance with a priceUSD property
 */
export const getSingleTokenPrice = (_pricesState: PricesState, _token: TokenData) => {
    let token_ = {
        ..._token,
        priceUSD: 0,
    } as TokenData;

    if (!_pricesState.tokenPrices) {
        console.error("No token prices available")
        return token_
    }

    let tokenSymbol: string;
    if (token_.symbol === "WFX") {
        tokenSymbol = "FX";
    } else {
        tokenSymbol = token_.symbol;
    }

    const tokenPrice = _pricesState.tokenPrices.find(
        ({ symbol }) => symbol === tokenSymbol
    );
    if (!tokenPrice) {
        //console.log(`${token_.symbol} has no tracked price - defaulting to 0`)
        return token_
    }

    token_.priceUSD = tokenPrice.priceUSD;
    return token_
}


/**
 * Gets the prices of all supported cryptocurrencies.
 * The current list is based on the list of supported cryptocurrencies in Constants
 * @param _currencies A string array of the cryptocurrency(ies) to look up
 * @returns TokenPrice[] An array of TokenPrice
 */
export const getTokenPrices = async (_currencies: string[]) => {
    const currenciesParam = _currencies.join();
    try {
        const res: CmcResponse = await serveraxios.get(
            "/api/getLatest",
            {
                headers: {
                  "Content-Type": "application/json",
                },
                params: {
                    symbol: currenciesParam
                },

            }
        );
        console.log(res);
        const prices: any = parseTokenPricesV2(res, _currencies);
        const fxToken: any = prices.find((token: any) => token.symbol === 'FX');

        if (fxToken) {
            const wfxToken = {...fxToken, name: 'Wrapped Function X', symbol: 'WFX'};
            prices.push(wfxToken);
        }
        return prices

    } catch (error) {
        console.log(error)
        console.error("There was an error with the API while fetching latest prices");
        return null
    }
}

/**
 * Given the response from CMC api and the currencies used for the request, parses the
 * response to return an array of TokenPrice. This parses the data from v2/cryptocurrency/quotes/latest endpoint
 * @param _res A CmcResponse object from the server
 * @param _currencies A string array of cryptocurrency(cies) symbol(s).
 * @returns TokenPrice[] An array of TokenPrice
 */
 const parseTokenPricesV2 = (_res: CmcResponse, _currencies: string[]) => {
    let tokenPrices: TokenPrice[] = [];
    _currencies.forEach((currency) => {
        const target = _res.data[currency][0];
        const tokenPrice: TokenPrice = {
            name: target.name,
            symbol: target.symbol,
            priceUSD: target.quote.USD.price,
            lastUpdated: target.last_updated,
        }
        tokenPrices.push(tokenPrice);
    });
    return tokenPrices
}

/**
 * DEPRECATED
 * Given the response from CMC api and the currencies used for the request, parses the
 * response to return an array of TokenPrice. This parses the data from v1/cryptocurrency/quotes.
 * @param _res
 * @param _currencies
 * @returns An array of TokenPrice
 */
 const parseTokenPricesV1 = (_res: CmcResponse, _currencies: string[]) => {
    let tokenPrices: TokenPrice[] = [];
    _currencies.forEach((currency) => {
        const target = _res.data[currency];
        const tokenPrice: TokenPrice = {
            name: target.name,
            symbol: target.symbol,
            priceUSD: target.quote.USD.price,
            lastUpdated: target.last_updated,
        }
        tokenPrices.push(tokenPrice);
    });
    return tokenPrices
}

//***Do not use this unless CMC Api plan is upgraded***
/**
 * Sets the logoUrl of the token instance passed into the method.
 * @param _token The token instance to set
 * @returns a new token instance with a logoUrl property
 */
 export const getTokenMetaData = async (_token: TokenData) => {
    let token_ = {
        ..._token,
        logoUrl: "",
    } as TokenData

    if (token_.symbol === "BAVA") {
        token_.logoUrl = Constants.Tokens.Logos.BAVA;
        return token_
    } else if (token_.symbol === "FXG") {
        token_.logoUrl = Constants.Tokens.Logos.FXG;
        return token_
    } else if (token_.symbol === "GLP") {
        token_.logoUrl = Constants.Tokens.Logos.GLP;
        return token_
    }
    let tokenSymbol: string;
    if (token_.symbol === "WFX") {
        tokenSymbol = "FX";
    } else {
        tokenSymbol = token_.symbol;
    }
    try {
        const metaData: CmcResponse = await serveraxios.get(
            "/api/getCmcMeta",
            {
                params: {
                    symbol: tokenSymbol
                },
                withCredentials: true
            }
        );
        //if request succeeded but token is not tracked by CMC
        if (metaData.data.hasOwnProperty('status')) {
            if (metaData.data.status === 400) {
                token_.logoUrl = undefined;
                return token_
            }
        }

        token_.logoUrl = metaData.data[tokenSymbol][0].logo;
        return token_

    } catch (error) {
        console.error(`There was an error with the API: ${error}`);
        token_.logoUrl = undefined;
        return token_
    }
}