import React, { useCallback, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import BaklavaVaultCard from "./BaklavaVaultCard"


const BaklavaVault = () => {
  const [baklavaTvl, setBaklavaTvl] = useState(0);

  const calculateBaklavaVaultTvl = useCallback((tvlArr: number[]) => {
    setBaklavaTvl(tvlArr.reduce((acc, i) => acc + i, 0));
  }, []);
  
  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: "30px",
        paddingLeft: { xs: "30px", sm: "50px" },
        paddingRight: { xs: "30px", sm: "50px" },
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sx={{ paddingBottom: "15px" }}>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Typography variant="h4">TVL:</Typography>
            <Typography
              variant="h4"
              component="span"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                ml: 1,
              }}
            >
              {`~$${baklavaTvl.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}`}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <BaklavaVaultCard calculateTvl={calculateBaklavaVaultTvl} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BaklavaVault;
