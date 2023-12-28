import React, { useState, useEffect } from "react";
import UniswapV3Card from "./UniswapV3Card";
import { Grid, Box } from "@mui/material";
import { Constants } from "@/app/constants";
import { getUniswapV3FxEthMetrics, getUniswapV3FxUsdtMetrics } from "@/app/utils/Metrics";

const UniswapV3 = () => {
  const [uniswapv3Pools, setUniswapv3Pools] = useState(Constants.UniswapV3.UniswapV3FXData);

  useEffect(() => {
    const fetchUniswapData = async () => {
      const pool1Data = await getUniswapV3FxEthMetrics();
      // console.log("Pool 1 Data: ", pool1Data);
      if (pool1Data) {
        setUniswapv3Pools((state) => ({
          ...state,
          pool1: {
            ...state.pool1,
            tvl: pool1Data.data.pool.totalValueLockedUSD,
            token0Bonded: pool1Data.data.pool.totalValueLockedToken0,
            token1Bonded: pool1Data.data.pool.totalValueLockedToken1,
            txCount: pool1Data.data.pool.txCount,
          },
        }));
      }
      const pool2Data = await getUniswapV3FxUsdtMetrics();
      if (pool2Data) {
        setUniswapv3Pools((state) => ({
          ...state,
          pool2: {
            ...state.pool2,
            tvl: pool2Data.data.pool.totalValueLockedUSD,
            token0Bonded: pool2Data.data.pool.totalValueLockedToken0,
            token1Bonded: pool2Data.data.pool.totalValueLockedToken1,
            txCount: pool2Data.data.pool.txCount,
          },
        }));
      }
    };
    fetchUniswapData();
    const interval = setInterval(() => {
      fetchUniswapData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: "30px",
        paddingBottom: "30px",
        display: "flex",
        flexDirection: { xs: 'column', sm: 'row' },
        px: { xs: 3, sm: 5 }
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 4 }}>
        <Grid item xs={12} sm={6}>
          <UniswapV3Card
            token0={uniswapv3Pools.pool1.token0}
            token0Bonded={uniswapv3Pools.pool1.token0Bonded}
            token1={uniswapv3Pools.pool1.token1}
            token1Bonded={uniswapv3Pools.pool1.token1Bonded}
            tvl={uniswapv3Pools.pool1.tvl}
            txCount={uniswapv3Pools.pool1.txCount}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UniswapV3Card
            token0={uniswapv3Pools.pool2.token0}
            token0Bonded={uniswapv3Pools.pool2.token0Bonded}
            token1={uniswapv3Pools.pool2.token1}
            token1Bonded={uniswapv3Pools.pool2.token1Bonded}
            tvl={uniswapv3Pools.pool2.tvl}
            txCount={uniswapv3Pools.pool2.txCount}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UniswapV3;
