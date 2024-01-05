import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { StyledTableCell } from "../DataTable";
import TableCell from "@mui/material/TableCell";
import { Link, Paper } from "@mui/material";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LPIcon from "@/app/defisnapshot/LPIcon";
import LinearProgress from "@mui/material/LinearProgress";
import { useCalculateFarmRows } from "@/app/utils/calculateFarm";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

const FxSwapFarmGroup = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(true);

  const farmData = useCalculateFarmRows();

  const modifyValueString = (str: string) => {
    const indexOfDot = str.indexOf(".");
    return str.slice(0, indexOfDot + 6);
  };

  useEffect(() => {
    const interval = setTimeout(() => setIsLoading(false), 10000);
    return () => clearTimeout(interval);
  }, []);

  const renderMobileBody = () => {
    if (farmData.data.length === 0 || !farmData.data[0].id) {
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
        {farmData.data.map((row, index) => (
          <Card key={index} sx={{ backgroundColor: "rgb(26,26,26)" }}>
            <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LPIcon
                  token0Src={row.token0LogoUrl}
                  token1Src={row.token1LogoUrl}
                />
                <Box sx={{ ml: 2 }}>
                  <Box>
                    <Typography variant="h6">{row.farmName}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Grid container spacing={1} sx={{ marginTop: "8px" }}>
                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="subtitle1">Deposit: </Typography>
                      <Typography variant="subtitle1">
                        {row.deposit.slice(0, 5)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="subtitle1">Rewards: </Typography>
                      <Typography variant="subtitle1">
                        {row.rewards.slice(0, 5)}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle1">{`$${modifyValueString(
                          row.rewardValue
                        )}`}</Typography>
                        <Box
                          component="img"
                          sx={{
                            height: "28px",
                            marginLeft: "5px",
                            alignSelf: "center",
                          }}
                          src={row.rewardLogoUrl}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="subtitle1">Value: </Typography>
                      <Typography variant="subtitle1">
                        {`$${modifyValueString(row.value)}`}
                      </Typography>
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
    if (farmData.data.length === 0 || !farmData.data[0].id) {
      return (
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={6}
              sx={{ textAlign: "center", padding: 2, borderBottom: 0 }}
            >
              <Typography variant="subtitle1">
                {"----You do not have any ongoing positions - head to "}
                <Link href="https://fx-swap.io/#/farm">Fx Swap</Link>
                {" to get started----"}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
    return (
      <TableBody>
        {farmData.data.map((row, index) => (
          <TableRow key={index}>
            <StyledTableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LPIcon
                  token0Src={row.token0LogoUrl}
                  token1Src={row.token1LogoUrl}
                />
                <Box sx={{ display: "block" }}>
                  <Box>
                    <Typography variant="h6">{row.farmName}</Typography>
                  </Box>
                </Box>
              </Box>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography variant="h6">{row.deposit.slice(0, 20)}</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItmes: "center",
                }}
              >
                <Box sx={{ display: "block" }}>
                  <Typography variant="h6">
                    {row.rewards.slice(0, 12)}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: "250" }}>
                    {`$${modifyValueString(row.rewardValue)}`}
                  </Typography>
                </Box>
                <Box
                  component="img"
                  sx={{
                    height: "28px",
                    marginLeft: "5px",
                    alignSelf: "center",
                  }}
                  src={row.rewardLogoUrl}
                />
              </Box>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography variant="h6">
                {`$${modifyValueString(row.value)}`}
              </Typography>
            </StyledTableCell>
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
              {farmData.headings[0]}
            </StyledTableCell>
            {farmData.headings.slice(1).map((heading, index) => {
              return (
                <StyledTableCell key={index} size="medium" align="right">
                  {heading}
                </StyledTableCell>
              );
            })}
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

export default FxSwapFarmGroup;
