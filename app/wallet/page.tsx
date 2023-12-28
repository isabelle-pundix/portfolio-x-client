"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import WalletCard from "./WalletCard";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../state/ReduxHooks";
import { selectUser } from "../state/user/userSlice";
import Login from "../login/walletLogin";

const Wallet: React.FC = () => {

  const user = useAppSelector(selectUser);

  const [totalHoldings, setTotalHoldings] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleData = (action: string, arg: any) => {
    if (action === "totalHoldings") {
      setTotalHoldings(arg.toFixed(3).toString());
    } else if (action === "loading") {
      setIsLoading(arg);
    }
  };

  useEffect(() => {}, [user._id])
  

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
          <AccountBalanceWalletIcon />
          <Typography variant="h4" paddingLeft="15px">
            Wallet
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            paddingTop: "30px",
            paddingLeft: "50px",
            paddingRight: "50px",
            paddingBottom: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid>
            <Grid container alignItems="center" justifyContent="center">
            <Grid item>
              {isLoading ? (
                <CircularProgress color="inherit" size="1.5rem"/>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h5" paddingRight={2}>Wallet Holdings:</Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "rgb(255, 255, 0)",
                    }}
                  >
                    ${totalHoldings.toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            width: "80%",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingBottom: "16px",
            margin: "auto",
          }}
        >
          <Grid item>
            <WalletCard
              onTotalHoldings={(arg: any) => handleData("totalHoldings", arg)}
              loading={(arg: any) => handleData("loading", arg)}
            />
          </Grid>
        </Box>
      </Paper>
    </Box>
  ) : <Login />;
};

export default Wallet;
