import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { StyledTableCell } from "../DataTable";
import TableCell from "@mui/material/TableCell";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LPIcon from "@/app/defisnapshot/LPIcon";
import LPComposition from "../LPComposition";
import { Link, Paper } from "@mui/material";
import {
  getLiquidityAdditions,
  getLiquidityBurns,
} from "@/app/utils/Liquidity";
import {
  calcHistoricalLiquidityValue,
  calcUnrealizedGL1,
} from "@/app/utils/FxSwap";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Web3 from "web3";
import { getFxEvmEvents } from "@/app/utils/evm";
import {
  calculateFxSwapPoolGroup,
  calculatePoolRows,
} from "@/app/utils/calculateLiquidity";

const formulaText =
  "The unrealized is calculated by taking the current net value (sum of \
    liquidity and farm position, based on current price of FX) minus the historical net value (sum of \
    adding and removing liquidity to the pool, based on the price of FX at the time of each event), \
    represented as a precentage of the historical net value";

const FxSwapPoolGroup = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [isCalculating, setIsCalculating] = useState(true);
  // const [additions, setAdditions] = useState<LiquidityAdds | null>(null);
  // const [burns, setBurns] = useState<LiquidityBurns | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dataUpdated = calculateFxSwapPoolGroup();
  const poolData = calculatePoolRows();

  const modifyValueString = (str: string) => {
    const indexOfDot = str.indexOf(".");
    return str.slice(0, indexOfDot + 6);
  };

  // useEffect(() => {
  //   let isSubscribed = true;
  //   const fetchGraphQL = async () => {
  //     if (addr) {
  //       const a = await getLiquidityAdditions(addr);
  //       const b = await getLiquidityBurns(addr);
  //       if (isSubscribed) {
  //         setAdditions(a);
  //         setBurns(b);
  //       }
  //     }
  //   };
  //   fetchGraphQL().catch();
  //   return () => {
  //     isSubscribed = false;
  //   };
  // }, [addr, data]);

  // const dataUpdated = useMemo(() => {
  //   if (additions && burns) {
  //     return calcUnrealizedGL1(
  //       calcHistoricalLiquidityValue(data, additions, burns)
  //     );
  //   } else {
  //     return data;
  //   }
  // }, [data, additions, burns]);

  useEffect(() => {
    const interval = setTimeout(() => setIsLoading(false), 10000);
    return () => clearTimeout(interval);
  }, []);

  // useEffect(() => {
  //   //console.log(dataUpdated)
  //   if (dataUpdated.length >= 1 && dataUpdated[0].farmTotalValue !== "0") {
  //     setIsCalculating(false);
  //   } else {
  //     setIsCalculating(true);
  //   }
  // }, [dataUpdated]);

  const renderMobileBody = () => {
    if (dataUpdated.length === 0 || !dataUpdated[0].id) {
      return (
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={6}
              sx={{ textAlign: "center", padding: 2, borderBottom: 0 }}
            >
              <Typography variant="subtitle1">
                {"----You do not have any ongoing positions - head to "}
                <Link href="https://fx-swap.io/#/pool">Fx Swap</Link>
                {" to get started----"}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
    return (
      <Box>
        {dataUpdated.map((row, index) => (
          <Card sx={{ backgroundColor: "rgb(26,26,26)"}}>
            <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LPIcon
                  token0Src={row.token0LogoUrl}
                  token1Src={row.token1LogoUrl}
                />
                <Box sx={{ ml: 2 }}>
                  <Box>
                    <Typography variant="h6">{row.position}</Typography>
                  </Box>
                  <Typography variant="subtitle1">
                    {`${row.positionAddress.slice(0, 12)}...`}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Grid container spacing={1} sx={{ marginTop: "8px" }}>
                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="subtitle1">Tokens: </Typography>
                      <Typography variant="subtitle1">
                        {row.liquidityTokenBalance.slice(0, 5)}
                      </Typography>
                      <LPComposition
                        token0PooledAmount={row.token0PooledAmount.slice(0, 5)}
                        token0Src={row.token0LogoUrl}
                        token1PooledAmount={row.token1PooledAmount.slice(0, 5)}
                        token1Src={row.token1LogoUrl}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="subtitle1">Value: </Typography>
                      <Typography variant="subtitle1">{`$${modifyValueString(
                        row.liquidityValue
                      )}`}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  };

  const renderTableBody = () => {
    if (dataUpdated.length === 0 || !dataUpdated[0].id) {
      return (
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={6}
              sx={{ textAlign: "center", padding: 2, borderBottom: 0 }}
            >
              <Typography variant="subtitle1">
                {"----You do not have any ongoing positions - head to "}
                <Link href="https://fx-swap.io/#/pool">Fx Swap</Link>
                {" to get started----"}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
    return (
      <TableBody>
        {dataUpdated.map((row, index) => (
          <TableRow key={index}>
            <StyledTableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LPIcon
                  token0Src={row.token0LogoUrl}
                  token1Src={row.token1LogoUrl}
                />
                <Box sx={{ display: "block" }}>
                  <Box>
                    <Typography variant="h6">{row.position}</Typography>
                  </Box>
                  <Typography variant="subtitle1">
                    {`${row.positionAddress.slice(0, 12)}...`}
                  </Typography>
                </Box>
              </Box>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Box sx={{ display: "block" }}>
                <Typography variant="h6">
                  {row.liquidityTokenBalance.slice(0, 12)}
                </Typography>
                <LPComposition
                  token0PooledAmount={row.token0PooledAmount.slice(0, 16)}
                  token0Src={row.token0LogoUrl}
                  token1PooledAmount={row.token1PooledAmount.slice(0, 16)}
                  token1Src={row.token1LogoUrl}
                />
              </Box>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography variant="h6">
                {`$${modifyValueString(row.liquidityValue)}`}
              </Typography>
            </StyledTableCell>

            {/* <StyledTableCell align="right">
              <Box sx={{ display: "block" }}>
                {isCalculating ? (
                  <CircularProgress color="inherit" size="1rem" />
                ) : (
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color:
                          row.unrealizedGL_P.charAt(0) === "-"
                            ? "red"
                            : "green",
                      }}
                    >
                      {row.unrealizedGL_P.charAt(0) === "-"
                        ? `${row.unrealizedGL_P.slice(0, 8)}%`
                        : `${row.unrealizedGL_P.slice(0, 7)}%`}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color:
                          row.unrealizedGL_P.charAt(0) === "-"
                            ? "red"
                            : "green",
                        fontWeight: "250",
                      }}
                    >
                      {row.unrealizedGL_V.charAt(0) === "-"
                        ? `$${row.unrealizedGL_V.slice(0, 8)}`
                        : `$${row.unrealizedGL_V.slice(0, 7)}`}
                    </Typography>
                  </Box>
                )}
              </Box>
            </StyledTableCell> */}
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return isMobile ? (
    isLoading ? (
      <Box>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={6}
                sx={{ textAlign: "center", padding: 2, borderBottom: 0 }}
              >
                <Box display={"grid"} sx={{ width: "100%" }}>
                  <Typography variant="subtitle1">Loading...</Typography>
                  <LinearProgress color="inherit" />
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    ) : (
      renderMobileBody()
    )
  ) : (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell size="medium">
              {poolData.headings[0]}
            </StyledTableCell>
            {poolData.headings.slice(1, -1).map((heading, index) => {
              return (
                <StyledTableCell key={index} size="medium" align="right">
                  {heading}
                </StyledTableCell>
              );
            })}
            <StyledTableCell size="medium" align="right">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {poolData.headings[poolData.headings.length - 1]}
                {/* <Tooltip title={formulaText} placement="top-end">
                <InfoIcon fontSize="medium" sx={{ paddingLeft: 0.5 }} />
              </Tooltip> */}
              </Box>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={6}
                sx={{ textAlign: "center", padding: 2, borderBottom: 0 }}
              >
                <Box display={"grid"} sx={{ width: "100%" }}>
                  <Typography variant="subtitle1">Loading...</Typography>
                  <LinearProgress color="inherit" />
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          renderTableBody()
        )}
      </Table>
    </Box>
  );
};
export default FxSwapPoolGroup;
