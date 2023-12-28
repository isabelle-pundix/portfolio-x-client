//NOTE: Always manually check with the CMC API if the token is supported.
//For instance, BAVA, FXG (FoxGaming), NOMO do not have data on CMC

export const BAVA_LOGO = "https://raw.githubusercontent.com/YP010/FXSwap-TokenList/main/Tokens/0xc8B4d3e67238e38B20d38908646fF6F4F48De5EC/logo.png";
export const FOXGAMING_LOGO = "https://raw.githubusercontent.com/YP010/FXSwap-TokenList/main/Tokens/0xebd3B8b345A325B0fcE339aeEa9996A6a5a947dc/logo.png"

export enum Logos {
    FX = "https://s2.coinmarketcap.com/static/img/coins/64x64/3884.png",
    PUNDIX = "https://s2.coinmarketcap.com/static/img/coins/64x64/9040.png",
    WETH = "https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png",
    USDT = "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    PURSE = "https://raw.githubusercontent.com/YP010/FXSwap-TokenList/main/Tokens/0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687/logo.png",
    DAI = "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png",
    C98 = "https://s2.coinmarketcap.com/static/img/coins/64x64/10903.png",
    BAVA = "https://raw.githubusercontent.com/YP010/FXSwap-TokenList/main/Tokens/0xc8B4d3e67238e38B20d38908646fF6F4F48De5EC/logo.png",
    FXG = "https://raw.githubusercontent.com/YP010/FXSwap-TokenList/main/Tokens/0xebd3B8b345A325B0fcE339aeEa9996A6a5a947dc/logo.png",
    EURS = "https://s2.coinmarketcap.com/static/img/coins/64x64/2989.png",
    BUSD = "https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png",
    FRAX = "https://s2.coinmarketcap.com/static/img/coins/64x64/6952.png",
    LINK = "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
    USDC = "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    AVAX = "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
    BNB = "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
    MATIC = "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
    ETH = "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    BTC = "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    WBTC = "https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png",
    ATOM = "https://s2.coinmarketcap.com/static/img/coins/128x128/3794.png",
    GLP = "https://raw.githubusercontent.com/gmx-io/gmx-assets/main/GMX-Assets/PNG/GLP_LOGO%20ONLY.png",
    PNG = "https://s2.coinmarketcap.com/static/img/coins/128x128/8422.png",
    QI = "https://s2.coinmarketcap.com/static/img/coins/128x128/9288.png",
    sAVAX = "https://s2.coinmarketcap.com/static/img/coins/128x128/18523.png",
}

export enum SupportedTokenSymbols {
    FX = "FX",
    PUNDIX = "PUNDIX",
    WETH = "WETH",
    USDT = "USDT",
    PURSE = "PURSE",
    DAI = "DAI",
    C98 = "C98",
    // BAVA = "BAVA",
    // FXG = "FXG",
    EURS = "EURS",
    BUSD = "BUSD",
    FRAX = "FRAX",
    LINK = "LINK",
    USDC = "USDC",
    AVAX = "AVAX",
    BNB = "BNB",
    MATIC = "MATIC",
    ETH = "ETH",
    BTC = "BTC",
    WBTC = "WBTC",
    ATOM = "ATOM",
}

const SupportedTokens = {
    "name": "FX Token List",
    "version": {
        "major": 1,
        "minor": 0,
        "patch": 0
    },
    "keywords": [
        "FX",
        "Tokens"
    ],
    "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/FX.png",

    "timestamp": "2022-06-08T09:30:00+0000",
    "tokens": [
        // {
        //     "name": "FX Token",
        //     "chainId": 530,
        //     "symbol": "FX",
        //     "decimals": 18,
        //     "address": "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x8c15Ef5b4B21951d50E53E4fbdA8298FFAD25057/logo.png"
        // },
        {
            "name": "Pundi X Token",
            "chainId": 530,
            "symbol": "PUNDIX",
            "decimals": 18,
            "address": "0xd567B3d7B8FE3C79a1AD8dA978812cfC4Fa05e75",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0xd567B3d7B8FE3C79a1AD8dA978812cfC4Fa05e75/logo.png"
        },
        {
            "name": "PURSE Token",
            "chainId": 530,
            "symbol": "PURSE",
            "decimals": 18,
            "address": "0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687/logo.png"
        },
        {
            "name": "Tether USD",
            "chainId": 530,
            "symbol": "USDT",
            "decimals": 6,
            "address": "0xecEEEfCEE421D8062EF8d6b4D814efe4dc898265",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0xecEEEfCEE421D8062EF8d6b4D814efe4dc898265/logo.png"
        },
        {
            "name": "Dai Stablecoin",
            "chainId": 530,
            "symbol": "DAI",
            "decimals": 18,
            "address": "0x1D54EcB8583Ca25895c512A8308389fFD581F9c9",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x1D54EcB8583Ca25895c512A8308389fFD581F9c9/logo.png"
        },
        {
            "name": "STASIS EURS TOKEN",
            "chainId": 530,
            "symbol": "EURS",
            "decimals": 2,
            "address": "0xc03345448969Dd8C00e9E4A85d2d9722d093aF8E",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0xc03345448969Dd8C00e9E4A85d2d9722d093aF8E/logo.png"
        },
        {
            "name": "Chainlink Token",
            "chainId": 530,
            "symbol": "LINK",
            "decimals": 18,
            "address": "0xFA3C22C069B9556A4B2f7EcE1Ee3B467909f4864",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0xFA3C22C069B9556A4B2f7EcE1Ee3B467909f4864/logo.png"
        },
        {
            "name": "Coin98",
            "chainId": 530,
            "symbol": "C98",
            "decimals": 18,
            "address": "0xC5e00D3b04563950941f7137B5AfA3a534F0D6d6",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0xC5e00D3b04563950941f7137B5AfA3a534F0D6d6/logo.png"
        },
        // {
        //     "name": "FoxGaming",
        //     "chainId": 530,
        //     "symbol": "FXG",
        //     "decimals": 18,
        //     "address": "0xebd3B8b345A325B0fcE339aeEa9996A6a5a947dc",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0xebd3B8b345A325B0fcE339aeEa9996A6a5a947dc/logo.png"
        // },
        {
            "name": "Wrapper Ether",
            "chainId": 530,
            "symbol": "WETH",
            "decimals": 18,
            "address": "0x0CE35b0D42608Ca54Eb7bcc8044f7087C18E7717",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x0CE35b0D42608Ca54Eb7bcc8044f7087C18E7717/logo.png"
        },
        {
            "name": "Binance USD",
            "chainId": 530,
            "symbol": "BUSD",
            "decimals": 18,
            "address": "0x5aD523d94Efb56C400941eb6F34393b84c75ba39",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x5aD523d94Efb56C400941eb6F34393b84c75ba39/logo.png"
        },
        {
            "name": "Frax",
            "chainId": 530,
            "symbol": "FRAX",
            "decimals": 18,
            "address": "0x3452e23F9c4cC62c70B7ADAd699B264AF3549C19",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x3452e23F9c4cC62c70B7ADAd699B264AF3549C19/logo.png"
        },
        {
            "name": "Wrapped AVAX",
            "chainId": 530,
            "symbol": "WAVAX",
            "decimals": 18,
            "address": "0x15C3Eb3B621d1Bff62CbA1c9536B7c1AE9149b57",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x15C3Eb3B621d1Bff62CbA1c9536B7c1AE9149b57/logo.png"
        },
        {
            "name": "USD Coin",
            "chainId": 530,
            "symbol": "USDC",
            "decimals": 6,
            "address": "0x5db67696C3c088DfBf588d3dd849f44266ff0ffa",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x5db67696C3c088DfBf588d3dd849f44266ff0ffa/logo.png"
        },
        // {
        //     "name": "BavaToken",
        //     "chainId": 530,
        //     "symbol": "BAVA",
        //     "decimals": 18,
        //     "address": "0xc8B4d3e67238e38B20d38908646fF6F4F48De5EC",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0xc8B4d3e67238e38B20d38908646fF6F4F48De5EC/logo.png"
        // },
        {
            "name": "Wrapped BTC",
            "chainId": 530,
            "symbol": "WBTC",
            "decimals": 8,
            "address": "0x13974cf36984216C90D1F4FC815C156092feA396",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x13974cf36984216C90D1F4FC815C156092feA396/logo.png"
        },
        {
            "name": "CosmosHub ATOM",
            "chainId": 530,
            "symbol": "ATOM",
            "decimals": 6,
            "address": "0x205CF44075E77A3543abC690437F3b2819bc450a",
            "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x205CF44075E77A3543abC690437F3b2819bc450a/logo.png"
        },
        // {
        //     "name": "Pundi X Token",
        //     "chainId": 90001,
        //     "symbol": "PUNDIX",
        //     "decimals": 18,
        //     "address": "0x5db67696C3c088DfBf588d3dd849f44266ff0ffa",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x5db67696C3c088DfBf588d3dd849f44266ff0ffa/logo-testnet.png"
        // },
        // {
        //     "name": "Tether USD",
        //     "chainId": 90001,
        //     "symbol": "USDT",
        //     "decimals": 6,
        //     "address": "0x3515F25AB7637adcF1b69F4D384ed5936B83431F",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x3515F25AB7637adcF1b69F4D384ed5936B83431F/logo-testnet.png"
        // },
        // {
        //     "name": "Wrapped Ether",
        //     "chainId": 90001,
        //     "symbol": "WETH",
        //     "decimals": 18,
        //     "address": "0xA2A4B12EF81E7A26C5a1E0be9340b1972F85E44A",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0xA2A4B12EF81E7A26C5a1E0be9340b1972F85E44A/logo-testnet.png"
        // },
        // {
        //     "name": "Wrapped BTC",
        //     "chainId": 90001,
        //     "symbol": "WBTC",
        //     "decimals": 8,
        //     "address": "0x8FA78CEB7F04118Ec6d06AaC37Ca854691d8e963",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x8FA78CEB7F04118Ec6d06AaC37Ca854691d8e963/logo-testnet.png"
        // },
        // {
        //     "name": "Dai Stablecoin",
        //     "chainId": 90001,
        //     "symbol": "DAI",
        //     "decimals": 18,
        //     "address": "0x4AF57825b86Abf93D4F9D720bEF7c1C1b300A6F3",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x4AF57825b86Abf93D4F9D720bEF7c1C1b300A6F3/logo-testnet.png"
        // },
        // {
        //     "name": "USD Coin",
        //     "chainId": 90001,
        //     "symbol": "USDC",
        //     "decimals": 6,
        //     "address": "0xE60CE2dfa6D4Ad37Ade1dcB7aC4D6C3A093b3A7E",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0xE60CE2dfa6D4Ad37Ade1dcB7aC4D6C3A093b3A7E/logo-testnet.png"
        // },
        // {
        //     "name": "Wrapped AVAX",
        //     "chainId": 90001,
        //     "symbol": "WAVAX",
        //     "decimals": 18,
        //     "address": "0x2C68D1d6aB986Ff4640b51e1F14C716a076E44C4",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x2C68D1d6aB986Ff4640b51e1F14C716a076E44C4/logo-testnet.png"
        // },
        // {
        //     "name": "PURSE Token",
        //     "chainId": 90001,
        //     "symbol": "PURSE",
        //     "decimals": 18,
        //     "address": "0xc8B4d3e67238e38B20d38908646fF6F4F48De5EC",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0xc8B4d3e67238e38B20d38908646fF6F4F48De5EC/logo-testnet.png"
        // },
        // {
        //     "name": "JUST Stablecoin v1.0",
        //     "chainId": 90001,
        //     "symbol": "USDJ",
        //     "decimals": 18,
        //     "address": "0x13974cf36984216C90D1F4FC815C156092feA396",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x13974cf36984216C90D1F4FC815C156092feA396/logo-testnet.png"
        // },
        // {
        //     "name": "FX USD",
        //     "chainId": 90001,
        //     "symbol": "USDF",
        //     "decimals": 6,
        //     "address": "0x205CF44075E77A3543abC690437F3b2819bc450a",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0x205CF44075E77A3543abC690437F3b2819bc450a/logo-testnet.png"
        // },
        // {
        //     "name": "Chainlink Token",
        //     "chainId": 90001,
        //     "symbol": "LINK",
        //     "decimals": 18,
        //     "address": "0xF0965c8f0755CF080a61C91EDd6707F0532c8fE7",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0xF0965c8f0755CF080a61C91EDd6707F0532c8fE7/logo-testnet.png"
        // },
        // {
        //     "name": "BavaToken",
        //     "chainId": 90001,
        //     "symbol": "BAVA",
        //     "decimals": 18,
        //     "address": "0xc7e56EEc629D3728fE41baCa2f6BFc502096f94E",
        //     "logoURI": "https://raw.githubusercontent.com/FunctionX-SG/FXSwap-TokenList/main/Tokens/0xc7e56EEc629D3728fE41baCa2f6BFc502096f94E/logo-testnet.png"
        // }
    ],
  };

  export const supportedTokensJSON = JSON.stringify(SupportedTokens);