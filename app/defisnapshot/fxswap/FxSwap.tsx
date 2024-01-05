import React, { useCallback, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Constants } from "@/app/constants";
import FxSwapCard from "./FxSwapCard";

const FxSwap = () => {
  const [fxswapTvl, setFxswapTvl] = useState(0);

  const fxswapFarmsSnapshot = Constants.FxSwapFarmsSnapshot.FXFarms;

  const calculateFxswapTvl = useCallback((tvlArr: number[]) => {
    setFxswapTvl(tvlArr.reduce((acc, i): number => acc + i));
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: "30px",
        paddingLeft: { xs: "30px", sm: "50px" }, // responsive padding left
        paddingRight: { xs: "30px", sm: "50px" }, // responsive padding left
        paddingBottom: "30px",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // flexDirection adjusted for mobile
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: "center", width: "100%"}}>
            <Typography
              variant="h4"
              >
                TVL:
            </Typography>
            <Typography
              variant="h4"
              component="span"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                ml: 1,
              }}
            >
              {`~$${fxswapTvl.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}`}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
        <FxSwapCard
          snapshot={fxswapFarmsSnapshot}
          calculateTvl={calculateFxswapTvl}
        />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FxSwap;
