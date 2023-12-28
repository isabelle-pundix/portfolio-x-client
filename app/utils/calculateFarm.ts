import { useAppSelector } from "../state/ReduxHooks";
import { useState, useEffect } from "react";
import { retrieveFarmPosMeta } from "./Farm";
import { Constants } from "../constants";
import { getFarmData } from "./FxSwap";
import exp from "constants";

export const retrieveFarmPos = () => {
  const userAddress =
    typeof window !== "undefined"
      ? window.localStorage.getItem("walletAddress")
      : null;
  const farmsState = useAppSelector((state) => state.farms);
  const pricesState = useAppSelector((state) => state.prices);

  const [updatedFarmPos, setUpdatedFarmPos] = useState<UpdatedFarmPositions>({
    userAddress: null,
    farms: null,
  });

  useEffect(() => {
    const farmData = retrieveFarmPosMeta(farmsState, pricesState, userAddress);
    if (farmData) {
      setUpdatedFarmPos(farmData);
    } else {
      setUpdatedFarmPos({ userAddress: null, farms: null });
    }
  }, [farmsState, pricesState, userAddress]);

  return { updatedFarmPos };
};

export const calculateFarmRows = () => {
    const { updatedFarmPos } = retrieveFarmPos();
    const [farmRows, setFarmRows] = useState<FarmData[]>(
        Constants.Data.defaultFarmRow
      );
    
      const prices = useAppSelector((state) => state.prices.tokenPrices);
        let fxPrice = 0;
        if (prices) {
            const priceObj = prices.find(price => price.symbol === "FX")
            if (priceObj) {
                fxPrice = priceObj.priceUSD;
            }
        }
    
      const [totalValue, setTotalValue] = useState(0);

      useEffect(() => {
        if (updatedFarmPos.farms) {
            const updatedRows = getFarmData(updatedFarmPos.farms, fxPrice);
            console.log("Updated rows", updatedRows)
            if (updatedRows.length > 0) {
                setFarmRows(updatedRows);
            } else {
              setFarmRows(Constants.Data.defaultFarmRow);
            }
        }
    }, [updatedFarmPos, fxPrice])

    useEffect(() => {
        let total = 0;
        farmRows.forEach((farmRow) => {
          total += Number(farmRow.value);
        });
        setTotalValue(total);
      }, [farmRows]);

    const farmData = {
        group: "Farm",
        headings: ["Pools", "Deposit", "Rewards", "Value"],
        data: farmRows,
        total: totalValue,
      };

    return farmData;
}
