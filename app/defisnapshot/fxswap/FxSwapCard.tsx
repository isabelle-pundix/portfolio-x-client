import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import CardContent from "@mui/material/CardContent";
import LPIcon from "../LPIcon";
import { Constants } from "@/app/constants";
import { FarmsSnapshot } from "@/app/constants/FxSwapFarmsSnapshot";
import { getTokenMetaData2 } from "@/app/utils/Token";
import { useAppSelector } from "@/app/state/ReduxHooks";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface FxSwapCardProps {
  snapshot: FarmsSnapshot;
  calculateTvl: (arg: number[]) => void;
}

const headings = Constants.FxSwapFarmsSnapshot.FXFarmHeadings;

const FxSwapCard: React.FC<FxSwapCardProps> = ({ snapshot, calculateTvl }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const metrics = useAppSelector((state) => state.metrics);

  const aprArr = Object.values(metrics.metrics.fxswap.AllData.apr);
  const apyArr = Object.values(metrics.metrics.fxswap.AllData.apyDaily);
  const tvlArr = Object.values(metrics.metrics.fxswap.AllData.tvl);

  snapshot.farms.forEach((farm, index) => {
    farm.apr = aprArr[index];
    farm.apy = apyArr[index];
    farm.tvl = tvlArr[index];
  });

  const liquidityFarms = snapshot.farms
    .filter((farm) => {
      return farm.active === true;
    })
    .map((farm) => ({
      ...farm,
      token0: getTokenMetaData2(farm.token0),
      token1: getTokenMetaData2(farm.token1),
    }));

  useEffect(() => {
    calculateTvl(liquidityFarms.map((farm) => parseFloat(farm.tvl as string)));
  }, [liquidityFarms, calculateTvl]);

  return (
    <Box>
      {isMobile ? (
        liquidityFarms.map((farm, index) => (
          <Card key={index} sx={{ mb: 2, backgroundColor: "rgb(26,26,26)" }}>
            <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
              <Box sx={{ display: "flex", alignItems: "center"}}>
                <LPIcon
                  token0Src={farm.token0.logoUrl}
                  token1Src={farm.token1.logoUrl}
                />
                <Box sx={{ ml: 2}}>
                  <Typography variant="h6">{farm.farmName}</Typography>
                    <Link
                      href={farm.url}
                      style={{ color: "white" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`${farm.id.slice(0, 12)}...`}
                      <OpenInNewIcon
                        sx={{
                          padding: "1px",
                          // marginRight: "10px",
                          height: "16px",
                          width: "16px",
                        }}
                      />
                    </Link>
                </Box>
              </Box>
              <Box>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 6, md: 6 }}>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                      <Typography variant="subtitle1">APR: </Typography>
                      <Typography variant="subtitle1">{`${Number(farm.apr).toFixed(2)} %`}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                      <Typography variant="subtitle1">APY: </Typography>
                      <Typography variant="subtitle1">{`${Number(farm.apy).toFixed(2)} %`}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                      <Typography variant="subtitle1">TVL: </Typography>
                      <Typography variant="subtitle1">
                        {`$ ${Number(farm.tvl).toLocaleString("en-US", {maximumFractionDigits: 2,
                        })}`}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card sx={{ backgroundColor: "rgb(26,26,26)" }}>
          <CardContent>
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell size="medium"></TableCell>
                    {headings.slice(1).map((heading, index) => {
                      return (
                        <TableCell key={index} size="medium" align="right">
                          <Typography variant="h5">{heading}</Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {liquidityFarms.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell size="small" sx={{ borderBottom: 0 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LPIcon
                            token0Src={row.token0.logoUrl}
                            token1Src={row.token1.logoUrl}
                          />
                          <Box sx={{ display: "block" }}>
                            <Box>
                              <Typography variant="h6">{row.farmName}</Typography>
                            </Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "250" }}
                            >
                              <Link
                                href={row.url}
                                style={{ color: "white" }}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {`${row.id.slice(0, 12)}...`}
                                <OpenInNewIcon
                                  sx={{
                                    padding: "1px",
                                    // marginRight: "10px",
                                    height: "16px",
                                    width: "16px",
                                  }}
                                />
                              </Link>
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: 0 }}>
                        <Typography variant="subtitle1">
                          {`${Number(row.apr).toFixed(2)}`}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: 0 }}>
                        <Typography variant="subtitle1">
                          {`${Number(row.apy).toFixed(2)}`}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: 0 }}>
                        <Typography variant="subtitle1">
                          {`${Number(row.tvl).toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          })}`}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
      </Card>
      )}
    </Box>
  );
  };

export default FxSwapCard;
