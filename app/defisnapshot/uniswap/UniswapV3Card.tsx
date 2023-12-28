import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LPIcon from "../LPIcon";

interface UniswapV3CardProps {
  token0: TokenData;
  token0Bonded: Number | String;
  token1: TokenData;
  token1Bonded: Number | String;
  tvl: Number | String;
  txCount: Number | String;
}

const UniswapV3Card: React.FC<UniswapV3CardProps> = ({
  token0,
  token0Bonded,
  token1,
  token1Bonded,
  tvl,
  txCount,
}) => {
  return (
    <Box>
      <Card sx={{ backgroundColor: "rgb(26,26,26)" }}>
        <CardContent>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 6, sm: 6, md: 6 }}
          >
            <Grid item container={true} rowSpacing={2} md={6} xs={12}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LPIcon
                    token0Src={token0.logoUrl}
                    token1Src={token1.logoUrl}
                  ></LPIcon>
                  <Typography variant="h5">
                    {`${token0.symbol} / ${token1.symbol}`}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginRight: 2,
                  }}
                >
                  <Typography variant="h5">TVL:</Typography>
                  <Typography variant="subtitle1">
                    {`$${Number(tvl).toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}`}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginRight: 2,
                  }}
                >
                  <Typography variant="h5">Transaction Count:</Typography>
                  <Typography variant="subtitle1">
                    {Number(txCount).toLocaleString("en-US")}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item container={true} rowSpacing={2} md={6} xs={12}>
              <Grid item xs={12}>
                <Typography variant="h5">Bonded</Typography>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginRight: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      component="img"
                      sx={{
                        height: "24px",
                        width: "24px",
                        flexShrink: 0,
                        marginLeft: "0px",
                      }}
                      src={token0.logoUrl}
                    />
                    &nbsp;
                    <Typography variant="h6">{`${token0.symbol}`}</Typography>
                  </Box>
                  <Typography variant="subtitle1">
                    {Number(token0Bonded).toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginRight: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      component="img"
                      sx={{
                        height: "24px",
                        width: "24px",
                        flexShrink: 0,
                        marginLeft: "0px",
                      }}
                      src={token1.logoUrl}
                    />
                    &nbsp;
                    <Typography variant="h6">{`${token1.symbol}`}</Typography>
                  </Box>
                  <Typography variant="subtitle1">
                    {`${Number(token1Bonded).toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}`}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UniswapV3Card;
