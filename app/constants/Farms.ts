export interface FarmsConstant {
    [index: number]: {
        id: string;
        farmName: string;
        active: boolean;
        token0: TokenData;
        token1: TokenData;
    }
}

export interface Metrics {
    fxswap: {
        AllData: {
            _id: string;
            tvl: {
                [index: number | string]: string;
            },
            apr: {
                [index: number | string]: string;
            },
            apyDaily: {
                [index: number | string]: string;
            },
            lpTokenValue: {
                [index: number | string]: string;
            }
        }
    }
}

export const FXFarms: FarmsConstant = {
    0: {
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
        }
    },
    1: {
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
        }
    },
    2: {
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
        }
    },
    3: {
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
        }
    },
    4: {
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
        }
    },
    5: {
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
        }
    },
    6: {
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
        }
    }
}

export const FXFarmsMetricsDefault: Metrics = {
    fxswap: {
        AllData: {
            _id: "",
            tvl: {
                "0": "0",
                "1": "0",
                "2": "0",
                "3": "0",
                "4": "0",
                "5": "0",
                "6": "0",
            },
            apr: {
                "0": "0",
                "1": "0",
                "2": "0",
                "3": "0",
                "4": "0",
                "5": "0",
                "6": "0",
            },
            apyDaily: {
                "0": "0",
                "1": "0",
                "2": "0",
                "3": "0",
                "4": "0",
                "5": "0",
                "6": "0",
            },
            lpTokenValue: {
                "0": "0",
                "1": "0",
                "2": "0",
                "3": "0",
                "4": "0",
                "5": "0",
                "6": "0",
            }
        }
    }
}
