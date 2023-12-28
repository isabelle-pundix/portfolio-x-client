"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InsightsIcon from "@mui/icons-material/Insights";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import UniswapV3 from "./uniswap/Uniswap";
import FxSwap from "./fxswap/FxSwap";
import BaklavaVault from "./baklavaVaults/BaklavaVault";

const DefiSnapshot: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch(value) {
      case 0: 
       return <UniswapV3 />;
      case 1:
        return <FxSwap />;
      case 2: 
        return <BaklavaVault/>;
    }
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Paper sx={{ borderRadius: 0, flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            paddingTop: "120px",
            justifyContent: "center",
          }}
        >
          <InsightsIcon />
          <Typography variant="h4" paddingLeft="15px">
            DeFi Snapshot
          </Typography>
        </Box>
        <Box sx={{ width: "100%", paddingTop: "30px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            // variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
            centered
            
          >
            <Tab
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
                typography: "h5",
              }}
              label="Uniswap V3"
            />
            <Tab
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
                typography: "h5",
              }}
              label="FX Swap"
            />
            <Tab
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
                typography: "h5",
              }}
              label="Baklava Vaults"
            />
          </Tabs>
        </Box>
        {renderTabContent()}
      </Paper>
    </Box>
  );
};
export default DefiSnapshot;
