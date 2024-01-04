import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";
import { calculateFarmRows } from "../utils/calculateFarm";
import { calculatePoolRows } from "../utils/calculateLiquidity";
import { useWalletData } from "../utils/calculateWalletValue";
import { useEffect, useState } from "react";
import { useAppSelector } from "../state/ReduxHooks";
import { getCosmosAddress } from "../utils/Delegations";
import { retrieveDelegationInfo } from "../utils/calculateDelegations";
import { CircularProgress } from "@mui/material";

interface ValueDataItem {
  id: number;
  value: number;
  label: string;
  percentage: string;
}

export default function TotalAssetPie() {
  const [valueData, setValueData] = useState<ValueDataItem[]>([]);
  let arrTotal: number[] = [];
  const [assetTotal, setAssetTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const allFarmData = calculateFarmRows();
  const farmTotal = allFarmData.total;
  const poolData = calculatePoolRows();
  const liquidityTotal = poolData.total;
  const updatedBalances = useWalletData();
  const walletTotal =
    updatedBalances?.reduce(
      (total, balance) => total + balance.tokenValue,
      0
    ) ?? 0;
  const [delegationsTotal, setDelegationsTotal] = useState(0);

  const addr =
    typeof window !== "undefined"
      ? window.localStorage.getItem("walletAddress")
      : null;

  const prices = useAppSelector((state) => state.prices.tokenPrices);

  let fxPrice = 0;
  if (prices) {
    const priceObj = prices.find((price) => price.symbol === "FX");
    if (priceObj) {
      fxPrice = priceObj.priceUSD;
    }
  }

  useEffect(() => {
    const fetchDelegationInfo = async () => {
      try {
        const cosmosAddress = await getCosmosAddress(addr!);
        if (!cosmosAddress) {
          return;
        } else {
          const delegationRes = await retrieveDelegationInfo(
            cosmosAddress,
            fxPrice
          );
          if (delegationRes) {
            let newData = [];
            const { totalValue, rewardSum, delegations } = delegationRes;
            const total = totalValue.toNumber();
            setDelegationsTotal(total);
          } else {
            setDelegationsTotal(0);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (addr) {
      fetchDelegationInfo();
    }
  }, [addr]);

  const orderArr = ["Wallet", "Farm", "Liquidity", "Delegation"];

  useEffect(() => {
    arrTotal = [walletTotal, farmTotal, liquidityTotal, delegationsTotal];
    const total = walletTotal + farmTotal + liquidityTotal + delegationsTotal;
    setAssetTotal(total);

    let newData = [];

    for (let i = 0; i < arrTotal.length; i++) {
      let id: number = i;
      let value = Number(arrTotal[i]);
      let label = orderArr[i];
      let percentage = `${Math.round((value / assetTotal) * 100)}%`;
      newData.push({ id, value, label, percentage });
    }
    setValueData(newData);
  }, [walletTotal, farmTotal, liquidityTotal, delegationsTotal]);

  const CustomItemTooltipContent = (props: any) => {
    const { itemData, series } = props;
    let index: number = itemData.dataIndex;
    let label: string = series.data[index].label;
    let percentage: string = series.data[index].percentage;
    let value: number = series.data[index].formattedValue;
    let color: string = series.data[index].color;

    return (
      <Box p={2} display="flex" alignItems="center" position="relative">
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></div>
        <Box display="flex" alignItems="center" zIndex="1" position="relative">
          <div
            style={{
              backgroundColor: color,
              width: "10px",
              height: "10px",
              marginRight: "8px",
              flexShrink: 0,
            }}
          ></div>
          <Typography
            variant="subtitle1"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <span style={{ marginRight: "15px" }}>{label}</span>
            <span style={{ marginRight: "15px" }}>${value}</span>
            <span>{percentage}</span>
          </Typography>
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [addr]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="subtitle2" sx={{ textAlign: 'center', my: 2 }}>
        Total Asset
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={250}>
          <CircularProgress color="inherit" />
        </Box>
      ) : assetTotal !== 0 ? (
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <Typography variant="subtitle1" sx={{ color: "rgb(255, 255, 0)" }}>
            ${assetTotal.toLocaleString()}
          </Typography>
          <PieChart
            series={[
              {
                data: valueData,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 30, additionalRadius: -30 },
              },
            ]}
            height={250}
            margin={{ top: 1, bottom: 1, left: 1, right: 1 }}
            legend={{ hidden: true }}
            tooltip={{ trigger: "item", itemContent: CustomItemTooltipContent }}
          />
        </Box>
      ) : (
        <Typography variant="subtitle2" sx={{ textAlign: 'center', my: 2 }}>
          You do not have any assets on the Function X ecosystem.
        </Typography>
      )}
    </Box>
  );
  
}

export {};
