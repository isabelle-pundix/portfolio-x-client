"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import { useAppSelector } from "../state/ReduxHooks";
import { selectUser } from "../state/user/userSlice";
import Login from "../login/walletLogin";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LiquidityComponent from "./liquidity/LiquidityComponent";
import FarmComponent from "./farm/FarmComponent";
import DelegationsComponent from "./delegations/DelegationsComponent";

const Portfolio: React.FC = () => {
  const user = useAppSelector(selectUser);
  useEffect(() => {}, [user._id]);
  const [renderKey, setRenderKey] = useState(0);

  // Handle toggle header
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case 0:
        return (
          <LiquidityComponent
            key={renderKey}
          />
        );
      case 1:
        return <FarmComponent key={renderKey} />;
      case 2:
        return <DelegationsComponent key={renderKey} />;
    }
  };

  const userAddress =
    typeof window !== "undefined"
      ? window.localStorage.getItem("walletAddress")
      : null;

  useEffect(() => {
    setRenderKey((prevKey) => prevKey + 1);
  }, [userAddress]);

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
          <ScatterPlotIcon />
          <Typography variant="h4" paddingLeft="15px">
            Portfolio
          </Typography>
        </Box>
        <Box sx={{ width: "100%", paddingTop: "30px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            allowScrollButtonsMobile
            centered
          >
            <Tab
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
                typography: "h5",
              }}
              label="Liquidity"
            />
            <Tab
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
                typography: "h5",
              }}
              label="Farm"
            />
            <Tab
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
                typography: "h5",
              }}
              label="Delegations"
            />
          </Tabs>
        </Box>
        {renderTabContent()}
      </Paper>
    </Box>
  ) : (
    <Login />
  );
};

export default Portfolio;
