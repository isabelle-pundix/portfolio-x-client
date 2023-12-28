"use client";

import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Web3Wallet from "./Web3Wallet";


function Login() {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Paper
        sx={{
          borderRadius: 0,
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '80%',
            mb: 3,
          }}
        >
          <Typography sx={{ textAlign: "center" }}>
            Connect your wallet to view your wallet balances, delegations,
            liquidity provided, and yield farming positions on Function X.
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Grid item>
            <Web3Wallet />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Login;
