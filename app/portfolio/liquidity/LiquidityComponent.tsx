import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import FxSwapPoolGroup from "../dataComponents/FxSwapPoolGroup";
import { calculatePoolRows } from "@/app/utils/calculateLiquidity";

const LiquidityComponent= () => {
  const poolData = calculatePoolRows();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setTimeout(() => setIsLoading(false), 10000);
    return () => clearTimeout(interval);
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
          <Box sx={{ justifyContent: "center", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "16px",
              }}
            >
              <Typography variant="h5" paddingRight={2}>
                Total Liquidity Value:
              </Typography>
              {isLoading ? (
                <CircularProgress color="inherit" size="1.5rem" />
              ) : (
                <Typography
                  variant="h4"
                  sx={{
                    color: "rgb(255, 255, 0)",
                  }}
                >
                  ${poolData.total.toLocaleString()}
                </Typography>
              )}
            </Box>
            <Card sx={{backgroundColor: "rgb(26,26,26)" }}>
              <CardContent>
                <FxSwapPoolGroup />
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LiquidityComponent;
