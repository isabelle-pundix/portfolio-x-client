import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { useAppSelector } from "@/app/state/ReduxHooks";
import { getCosmosAddress } from "@/app/utils/Delegations";
import { retrieveDelegationInfo } from "@/app/utils/calculateDelegations";
import { useState, useEffect } from "react";

interface ValueDataItem {
  id: number;
  value: number;
  label: string;
  percentage: string;
}

export default function DelegationsPie() {
  const addr =
    typeof window !== "undefined"
      ? window.localStorage.getItem("walletAddress")
      : null;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [addr]);

  const [valueData, setValueData] = useState<ValueDataItem[]>([]);
  const [totalDelegationValue, setTotalDelegationValue] = useState(0);

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
            const { totalValue, delegations } = delegationRes;
            const total = totalValue.toNumber();
            setTotalDelegationValue(total);

            for (let i = 0; i < Object.keys(delegations).length; i++) {
              const key = Object.keys(delegations)[i];
              const delegation = delegations[key];
              let id = i;
              let value = Number(delegation.value);
              let label = delegation.moniker || "delegation";
              let percentage = `${Math.round((value / total) * 100)}%`;
              newData.push({ id, value, label, percentage });
            }
            setValueData(newData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (addr) {
      fetchDelegationInfo();
    }
  }, [addr, fxPrice]);

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

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="subtitle2" sx={{ textAlign: "center", my: 2 }}>
        Total Delegation
      </Typography>
      {loading ? (
        <Stack direction="row" width="100%" textAlign="center" spacing={2}>
          <Box
            flexGrow={1}
            height={250}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress color="inherit" />
          </Box>
        </Stack>
      ) : totalDelegationValue !== 0 ? (
        <Stack direction="row" width="100%" textAlign="center" spacing={2}>
          <Box flexGrow={1}>
            <Typography variant="subtitle1" sx={{ color: "rgb(255, 255, 0)" }}>
              ${totalDelegationValue.toLocaleString()}
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
              tooltip={{
                trigger: "item",
                itemContent: CustomItemTooltipContent,
              }}
            ></PieChart>
          </Box>
        </Stack>
      ) : (
        <Stack direction="row" width="100%" textAlign="center" spacing={2}>
          <Box flexGrow={1}>
            <Typography variant="subtitle2">
              You do not have any delegations on the Function X ecosystem.
            </Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
}

export {};
