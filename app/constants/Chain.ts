import { Chain } from 'wagmi';

export const FXCORE = {
    id: 530,
    name: "FX Mainnet",
    network: "f(x)Core",
    nativeCurrency: {
        decimals: 18,
        name: "FX",
        symbol: "FX",
    },
    rpcUrls: {
        public: { http: ["https://fx-json-web3.functionx.io:8545"]},
        default: { http: ["https://fx-json-web3.functionx.io:8545"]},
    },
    blockExplorers: {
        default: { name: "Starscan", url: "https://explorer.starscan.io/evm"},
    },
} as Chain