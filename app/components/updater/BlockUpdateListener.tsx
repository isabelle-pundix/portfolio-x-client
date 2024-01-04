"use client";

import React, { useState, useEffect } from "react";
import { ethers, WebSocketProvider } from "ethers";
import useIsWindowVisible from "@/app/hooks/useIsWindowVisible";
import { getLPTokens, getLiquidityPositions } from "@/app/utils/Liquidity";
import { useAppDispatch, useAppSelector } from "@/app/state/ReduxHooks";
import {
  updateAllLpTokens,
  updateLiquidityPositions,
} from "@/app/state/tokens/tokensActions";
import { Farms } from "@/app/state/liquidityFarms/farmReducer";
import { Constants } from "@/app/constants";
import { getPendingReward, getUserInfo } from "@/app/utils/Farm";
import { getFxSwapFarmMetrics } from "@/app/utils/Metrics";
import { updateFxswapFarmMetrics } from "@/app/state/metrics/metricActions";
import { selectAuth } from "@/app/state/authSlice";
import { updateFarms } from "@/app/state/liquidityFarms/farmActions";

const BlockUpdateListener = () => {
  const [startBlockNumber, setStartBlockNumber] = useState(0);
  const [lastBlockNumber, setLastBlockNumber] = useState(0);

  const windowVisible = useIsWindowVisible();
  const dispatch = useAppDispatch();
  const walletAddress =
    typeof window !== "undefined"
      ? window.localStorage.getItem("walletAddress")
      : null;
  const auth = useAppSelector(selectAuth);

  //Run only once to initialize starting block number on component mount
  useEffect(() => {
    const provider = new WebSocketProvider(
      "wss://fx-json-web3.functionx.io:8546"
    );
    const initializeStartBlock = async () => {
      const blockNumber = await provider.getBlockNumber();
      setStartBlockNumber(blockNumber);
    };
    initializeStartBlock();
  }, []);

  useEffect(() => {
    if (!windowVisible) {
      return;
    }
    const provider = new WebSocketProvider(
      "wss://fx-json-web3.functionx.io:8546"
    );
    const onNewBlock = (blockNumber: any) => {
      setLastBlockNumber(blockNumber);
    };
    provider.on("block", onNewBlock);
    return () => {
      provider.off("block", onNewBlock); //runs only when unmounted
    };
  }, [windowVisible]);

  useEffect(() => {
    if (lastBlockNumber - startBlockNumber >= 2 || walletAddress !== null) {
      console.log("2 new blocks");
      setStartBlockNumber(lastBlockNumber);
      // testing for position update
      const fetchUpdates = async () => {
        const fxswapFarmMetrics = await getFxSwapFarmMetrics();
        if (fxswapFarmMetrics && fxswapFarmMetrics.AllData) {
          dispatch(updateFxswapFarmMetrics(fxswapFarmMetrics));
        }

        const lpTokens: any = await getLPTokens();
        if (lpTokens) {
          dispatch(updateAllLpTokens(lpTokens.data));
          if (walletAddress !== null) {
            const liquidityPositions = await getLiquidityPositions(
              walletAddress
            );
            // if (liquidityPositions) {
              dispatch(updateLiquidityPositions(liquidityPositions?.data));
            // } 

            let farms: Farms = { ...Constants.Farms.FXFarms };
            const length = Object.keys(farms).length;

            let allRewardsAndInfoPromises: [
              Promise<number>,
              Promise<{ amount: string; rewardDebt: string }>
            ][] = [];
            for (let i = 0; i < length; i++) {
              allRewardsAndInfoPromises.push([
                getPendingReward(i, walletAddress),
                getUserInfo(i, walletAddress),
              ]);
            }
            let allRewardsAndInfo: [
              number,
              { amount: string; rewardDebt: string }
            ][] = await Promise.all(
              allRewardsAndInfoPromises.map((array) => Promise.all(array))
            );

            for (let i = 0; i < length; i++) {
              let lpTokenValue: string = "0";
              if (fxswapFarmMetrics) {
                lpTokenValue = fxswapFarmMetrics.AllData.lpTokenValue[i];
              }

              farms[i] = {
                ...farms[i],
                liquidityDeposited: allRewardsAndInfo[i][1].amount,
                unclaimedRewards: allRewardsAndInfo[i][0].toString(),
                lpTokenValue,
              };
            }

            // auth.success will change to false on every re-render
            // if (auth.success != false) {
            dispatch(updateFarms(farms));
          } else {
            return;
          }
          // }
        }
      };
      fetchUpdates();
    }
  }, [lastBlockNumber, startBlockNumber, walletAddress]);

  return null;
};

export default BlockUpdateListener;
