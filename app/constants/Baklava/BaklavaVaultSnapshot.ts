export interface BaklavaVaultSnapshot {
  id: string;
  vaultName: string;
  vaultCategory: number;
  active: boolean;
  apy: number;
  tvl: number;
  url: string;
  token0: TokenData;
  token1: TokenData | null;
}


export interface BaklavaVaultsSnapshot {
  vaults: BaklavaVaultSnapshot[];
}

export const BaklavaVaultsCategories: string[] = [
  "Fx-Swap Yield Farming Vault", // double
  "F(x)Core Delegate Vault", // single
  "Leveraged GLP Vault", // single
  "USDC Lending GLP Vault", // single
  "Pangolin Yield Farming Vault", // double
  "TraderJoe Yield Farming Vault", // double
  "BAVA Staking Vault", // single
];

export const BaklavaVaultsHeadings = ["Vaults", "", "APY (%)", "TVL ($)"];

export const BaklavaVaultsCategoriesColors: string[] = [
  "#4e79a7",
  "#f28e2c",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#af7aa1",
  "#9c755f",
  "#bab0ab",
  "#edc949",
  "#ff9da7",
];

