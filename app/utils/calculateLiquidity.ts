import { useAppSelector } from "../state/ReduxHooks";
import { useState, useEffect, useMemo } from "react";
import {
  retrieveLiquidityPosMeta,
  getLiquidityAdditions,
  getLiquidityBurns,
} from "./Liquidity";
import { retrieveFarmPosMeta } from "./Farm";
import { Constants } from "../constants";
import {
  getPoolData,
  getFarmData,
  matchPoolAndFarm,
  calcHistoricalLiquidityValue,
  calcUnrealizedGL1,
} from "./FxSwap";

export const useRetrieveLiquidityPos = () => {
  const userAddress =
    typeof window !== "undefined"
      ? window.localStorage.getItem("walletAddress")
      : null;

  const farmsState = useAppSelector((state) => state.farms);
  const tokensState = useAppSelector((state) => state.tokens);
  const pricesState = useAppSelector((state) => state.prices);

  const [updatedLiquidityPos, setUpdatedLiquidityPos] =
    useState<UpdatedLiquidityPositions>({
      userAddress: null,
      liquidityPositions: null,
    });

  const [updatedFarmPos, setUpdatedFarmPos] = useState<UpdatedFarmPositions>({
    userAddress: null,
    farms: null,
  });

  useEffect(() => {
    const liquidityData = retrieveLiquidityPosMeta(tokensState, pricesState);
    if (liquidityData) {
      setUpdatedLiquidityPos(liquidityData);
    } else {
      setUpdatedLiquidityPos({ userAddress: null, liquidityPositions: null });
    }
  }, [tokensState, pricesState]);

  useEffect(() => {
    const farmData = retrieveFarmPosMeta(farmsState, pricesState, userAddress);
    if (farmData) {
      setUpdatedFarmPos(farmData);
    } else {
      setUpdatedFarmPos({ userAddress: null, farms: null });
    }
  }, [farmsState, pricesState, userAddress]);

  return { updatedLiquidityPos, updatedFarmPos };
};

export const useCalculatePoolRows = () => {
  const { updatedLiquidityPos, updatedFarmPos } = useRetrieveLiquidityPos();
  const [poolRows, setPoolRows] = useState<PoolData[]>(
    Constants.Data.defaultPoolRow
  );
  const [farmRows, setFarmRows] = useState<FarmData[]>(
    Constants.Data.defaultFarmRow
  );
  const [totalValue, setTotalValue] = useState(0);
  const prices = useAppSelector((state) => state.prices.tokenPrices);
  let fxPrice = 0;
  if (prices) {
    const priceObj = prices.find((price) => price.symbol === "FX");
    if (priceObj) {
      fxPrice = priceObj.priceUSD;
    }
  }
  useEffect(() => {
    if (updatedLiquidityPos.liquidityPositions) {
      const updatedRows = getPoolData(updatedLiquidityPos.liquidityPositions);
      setPoolRows(updatedRows);
    } else {
      setPoolRows(Constants.Data.defaultPoolRow);
    }
  }, [updatedLiquidityPos]);

  useEffect(() => {
    if (updatedFarmPos.farms) {
      const updatedRows = getFarmData(updatedFarmPos.farms, fxPrice);
      if (updatedRows.length > 0) {
        setFarmRows(updatedRows);
      } else {
        setFarmRows(Constants.Data.defaultFarmRow);
      }
    }
  }, [updatedFarmPos, fxPrice]);

  const poolRowsMatched = useMemo(() => {
    return matchPoolAndFarm(poolRows, farmRows);
  }, [poolRows, farmRows]);

  useEffect(() => {
    let total = 0;
    poolRows.forEach((poolRow) => {
      total += Number(poolRow.liquidityValue);
    });
    setTotalValue(total);
  }, [poolRows]);

  const poolData = {
    group: "Liquidity",
    headings: [
      "Positions",
      "Your Total Pool Tokens",
      "Value",
      // "Unrealized +/-", // Remove this feature first
    ],
    data: poolRowsMatched,
    total: totalValue,
  };

  return poolData;
};

export const useCalculateFxSwapPoolGroup = () => {
  const poolData = useCalculatePoolRows();
  const addr = localStorage.getItem("walletAddress");
  const [additions, setAdditions] = useState<LiquidityAdds | null>(null);
  const [burns, setBurns] = useState<LiquidityBurns | null>(null);

  useEffect(() => {
    let isSubscribed = true;
    const fetchGraphQL = async () => {
      if (addr) {
        const a = await getLiquidityAdditions(addr);
        const b = await getLiquidityBurns(addr);
        if (isSubscribed) {
          setAdditions(a);
          setBurns(b);
        }
      }
    };
    fetchGraphQL().catch();
    return () => {
      isSubscribed = false;
    };
  }, [addr, poolData.data]);

  const dataUpdated = useMemo(() => {
    if (additions && burns) {
      return calcUnrealizedGL1(
        calcHistoricalLiquidityValue(poolData.data, additions, burns)
      );
    } else {
      return poolData.data;
    }
  }, [poolData.data, additions, burns]);

  return dataUpdated;
};
