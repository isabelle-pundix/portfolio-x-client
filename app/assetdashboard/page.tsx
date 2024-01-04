"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import PrivateNote from "./privatenotes/PrivateNote";
import PieActiveArc from "../wallet/WalletBalancePie";
import { useWalletData } from "../utils/calculateWalletValue";
import { useAppSelector } from "../state/ReduxHooks";
import { selectUser } from "../state/user/userSlice";
import Login from "../login/walletLogin";
import LiquidityPie from "../portfolio/liquidity/LiquidityPie";
import FarmPie from "../portfolio/farm/FarmPie";
import DelegationsPie from "../portfolio/delegations/DelegationsPie";
import TotalAssetPie from "./totalPie";
import DotsMobileStepper from "./pieChartStepper";

const AssetDashboard: React.FC = () => {
  const user = useAppSelector(selectUser);

  const updatedBalances = useWalletData();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {}, 15000);
    return () => {
      clearTimeout(timeout);
    };
  }, [updatedBalances]);

  useEffect(() => {}, [user._id]);

  // Render pie chart
  const renderPieChart = (step: number) => {
    switch (step) {
      case 0:
        return <TotalAssetPie/>;
      case 1:
        return <PieActiveArc updatedBalances={updatedBalances} />;
      case 2:
        return <LiquidityPie />;
      case 3:
        return <FarmPie />;
      case 4:
        return <DelegationsPie />;
    }
  };

  // Portfolio
  return user._id !== null ? (
    <Box height="100vh" display="flex" flexDirection="column">
      <Paper sx={{ borderRadius: 0, flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            paddingTop: "120px",
            justifyContent: "center",
          }}
        >
          <DataUsageIcon />
          <Typography variant="h4" paddingLeft="15px">
            Asset Dashboard
          </Typography>
        </Box>
        
            <Box
              sx={{
                width: "80%",
                paddingTop: "30px",
                paddingLeft: "50px",
                paddingRight: "50px",
                paddingBottom: "30px",
                display: "flex",
                flexDirection: "row",
                margin: "auto",
              }}
            >
              {renderPieChart(activeStep)}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <DotsMobileStepper
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </Box>{" "}
          
        
        <Box
          sx={{
            width: "80%",
            paddingTop: "30px",
            paddingLeft: "50px",
            paddingRight: "50px",
            paddingBottom: "30px",
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            margin: "auto",
          }}
        >
          <PrivateNote />
        </Box>
      </Paper>
    </Box>
  ) : (
    <Login />
  );
};

export default AssetDashboard;
