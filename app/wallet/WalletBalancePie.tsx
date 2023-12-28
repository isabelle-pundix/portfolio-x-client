import { Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { TokenBalancesWithValue } from "../state/walletBalance/walletBalanceSlice";
import { Box, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function PieActiveArc({
  updatedBalances,
}: {
  updatedBalances: TokenBalancesWithValue[] | null;
}) {
  let valueData = [] as {
    id: number;
    value: number;
    label: string;
    percentage: string;
  }[];

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

  let totalValue = 0;

  if (updatedBalances) {
    totalValue = updatedBalances.reduce(
      (total, balance) => total + balance.tokenValue,
      0
    );

    for (let i = 0; i < updatedBalances.length; i++) {
      let id: number = i;
      let value: number = updatedBalances[i].tokenValue;
      let label: string = updatedBalances[i].tokenSymbol;
      let percentage: string = `${Math.round((value / totalValue) * 100)}%`;
      valueData.push({ id, value, label, percentage });
    }
  }

  const CustomItemTooltipContent = (props: any) => {
    const { itemData, series } = props;
    let index: number = itemData.dataIndex;
    let label: string = series.data[index].label;
    let percentage: string = series.data[index].percentage;
    let value: number = series.data[index].formattedValue;
    let color: string = series.data[index].color;

    console.log("Series", series);

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
    <Box sx={{ width: '100%' }}>
      <Typography variant="subtitle2" sx={{ textAlign: 'center', my: 2 }}>Total Wallet</Typography>
      {loading ? (
        <Stack direction="row" width="100%" textAlign="center" spacing={2}>
          <Box flexGrow={1} height={250} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress color="inherit" />
          </Box>
        </Stack>
      ) : totalValue !== 0 ? (
        <Stack direction="row" width="100%" textAlign="center" spacing={2}>
          <Box flexGrow={1}>
            
            <Typography variant="subtitle1" sx={{ color: "rgb(255, 255, 0)" }}>
              ${totalValue.toLocaleString()}
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
        </Stack>
      ) : (
        <Stack direction="row" width="100%" textAlign="center" spacing={2}>
          <Box flexGrow={1}>
            <Typography variant="subtitle2">
              You do not have any wallet holdings on the Function X ecosystem.
            </Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
  
}

export {};
