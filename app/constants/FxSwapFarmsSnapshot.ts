export interface FarmSnapshot {
    id: string;
    farmName: string;
    active: boolean;
    token0: TokenData;
    token1: TokenData;
    apr: Number | String;
    apy: Number | String;
    tvl: Number | String;
    lpTokenValue: Number | String;
    url: string;
}

export interface FarmsSnapshot {
    farms: FarmSnapshot[]
}

export const FXFarmHeadings = ["Liquidity Farms", "APR (%)", "APY (%)", "TVL ($)"];

export const FXFarms: FarmsSnapshot = {
    farms: [
        {
            id: "0xb08fd050f877eb0677bf34537c386a720becbc7b",
            farmName: "FX-USDT",
            active: true,
            token0: {
                id: "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd",
                name: "Wrapped Function X",
                symbol: "WFX"
            },
            token1: {
                id: "0xeceeefcee421d8062ef8d6b4d814efe4dc898265",
                name: "Tether USD",
                symbol: "USDT"
            },
            apr: 0,
            apy: 0,
            tvl: 0,
            lpTokenValue: 0,
            url: "https://starscan.io/evm/address/0xb08fD050f877Eb0677bF34537C386A720beCbC7B",
        },
        {
            id: "0x7ed74ebda2f2ad577d9ef2aa6b6573b15fc14e39",
            farmName: "FX-PUNDIX",
            active: true,
            token0: {
                id: "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd",
                name: "Wrapped Function X",
                symbol: "WFX"
            },
            token1: {
                id: "0xd567b3d7b8fe3c79a1ad8da978812cfc4fa05e75",
                name: "Pundi X Token",
                symbol: "PUNDIX"
            },
            apr: 0,
            apy: 0,
            tvl: 0,
            lpTokenValue: 0,
            url: "https://starscan.io/evm/address/0x7eD74ebDA2f2AD577d9ef2aA6b6573b15FC14E39",
        },
        {
            id: "0x4d7f3396ab3e8d680f7bbd332d1fe452e2a7da6f",
            farmName: "PURSE-FX",
            active: true,
            token0: {
                id: "0x5fd55a1b9fc24967c4db09c513c3ba0dfa7ff687",
                name: "PURSE TOKEN",
                symbol: "PURSE",
            },
            token1: {
                id: "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd",
                name: "Wrapped Function X",
                symbol: "WFX",
            },
            apr: 0,
            apy: 0,
            tvl: 0,
            lpTokenValue: 0,
            url: "https://starscan.io/evm/address/0x4d7F3396ab3E8d680F7bbd332D1FE452E2a7dA6f",
        },
        {
            id: "0xad35c15c69d0e39e467b81003d03407ea908b33f",
            farmName: "FX-WETH",
            active: true,
            token0: {
                id: "0x0ce35b0d42608ca54eb7bcc8044f7087c18e7717",
                name: "Wrapped Ether",
                symbol: "WETH",
            },
            token1: {
                id: "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd",
                name: "Wrapped Function X",
                symbol: "WFX",
            },
            apr: 0,
            apy: 0,
            tvl: 0,
            lpTokenValue: 0,
            url: "https://starscan.io/evm/address/0xAd35C15C69D0E39E467b81003D03407EA908B33f",
        },
        {
            id: "0xc82287debda995665622d139da8aefa164748b21",
            farmName: "FX-FXG",
            active: false,
            token0: {
                id: "0x4dc015a60045fb20a3651b2e85af986354197fe5",
                name: "FoxGaming",
                symbol: "FXG",
            },
            token1: {
                id: "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd",
                name: "Wrapped Function X",
                symbol: "WFX",
            },
            apr: 0,
            apy: 0,
            tvl: 0,
            lpTokenValue: 0,
            url: "https://starscan.io/evm/address/0xC82287debda995665622d139dA8AEFA164748B21",
        },
        {
            id: "0xf2b6b384db3297dfb4847ad3910cd55d32fb1dcf",
            farmName: "FX-FXG",
            active: true,
            token0: {
                id: "0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd",
                name: "Wrapped Function X",
                symbol: "WFX",
            },
            token1: {
                id: "0xebd3b8b345a325b0fce339aeea9996a6a5a947dc",
                name: "FoxGaming",
                symbol: "FXG",
            },
            apr: 0,
            apy: 0,
            tvl: 0,
            lpTokenValue: 0,
            url: "https://starscan.io/evm/address/0xF2b6b384Db3297dfb4847aD3910Cd55d32Fb1dcF",
        },
        {
            id: "0x8D0C5e37eD713DaEb288932014e60D55065285Ff",
            farmName: "FX-BAVA",
            active: true,
            token0: {
                id: "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd",
                name: "Wrapped FunctionX",
                symbol: "WFX",
            },
            token1: {
                id: "0xc8B4d3e67238e38B20d38908646fF6F4F48De5EC",
                name: "BavaToken",
                symbol: "BAVA",
            },
            apr: 0,
            apy: 0,
            tvl: 0,
            lpTokenValue: 0,
            url: "https://starscan.io/evm/address/0x8D0C5e37eD713DaEb288932014e60D55065285Ff"
        }
    ]
}