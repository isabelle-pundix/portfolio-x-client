export {}

declare global {
  interface PriceChart {
    prices: number[][]
    market_caps: number[][]
    total_volumes: number[][]
  }
}
