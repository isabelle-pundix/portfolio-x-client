
export const UniswapV3FXData: {
    pool1: {
        token0: TokenData;
        token0Bonded: Number | String;
        token1: TokenData;
        token1Bonded: Number | String;
        tvl: Number | String;
        txCount: Number | String;
    },
    pool2: {
        token0: TokenData;
        token0Bonded: Number | String;
        token1: TokenData;
        token1Bonded: Number | String;
        tvl: Number | String;
        txCount: Number | String;
    }
} = {
    pool1: {
        token0: {
            id: "0x8c15Ef5b4B21951d50E53E4fbdA8298FFAD25057",
            name: "Function X",
            symbol: "FX",
            logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/3884.png",
        },
        token0Bonded: 0,
        token1: {
            id: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            name: "Ether",
            symbol: "ETH",
            logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
        },
        token1Bonded: 0,
        tvl: 0,
        txCount: 0
    },
    pool2: {
        token0: {
            id: "0x8c15Ef5b4B21951d50E53E4fbdA8298FFAD25057",
            name: "Function X",
            symbol: "FX",
            logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/3884.png"
        },
        token0Bonded: 0,
        token1: {
            id: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            name: "Tether",
            symbol: "USDT",
            logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
        },
        token1Bonded: 0,
        tvl: 0,
        txCount: 0
    },
}