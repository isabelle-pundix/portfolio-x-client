import React, { useEffect, useState } from "react";
import { useAppSelector } from "../state/ReduxHooks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { StyledTableCell } from "./DataTable";
import TableCell from "@mui/material/TableCell";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LinearProgress from "@mui/material/LinearProgress";
import {
  getCosmosAddress,
} from "../utils/Delegations";
import { Constants } from "../constants";
import {
  retrieveDelegationInfo,
  retrieveWithdrawalInfo,
} from "../utils/calculateDelegations";

// export interface DelegationsGroup {
//     setDelTotal: React.Dispatch<React.SetStateAction<number>>
// }

interface Delegations {
  [index: string]: {
    amount?: string;
    moniker?: string;
    reward?: string;
    rewardValue?: string;
    value?: string;
    gainOrLoss?: string;
  };
}

const Delegations = ({
  onTotalDelegationsChange,
}: {
  onTotalDelegationsChange: (value: number) => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const addr =
    typeof window !== "undefined"
      ? window.localStorage.getItem("walletAddress")
      : null;

  const [delegationState, setDelegationState] = useState<Delegations | null>(
    null
  );
  const [totalDelegationRewards, setTotalDelegationRewards] = useState<
    string | 0
  >(0);
  const [withdrawnReward, setWithdrawnReward] = useState<string | 0>(0);
  const [fetching, setFetching] = useState<boolean>(false);
  const [value, setValue] = useState(0);

  const [isLoading0, setIsLoading0] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);

  const prices = useAppSelector((state) => state.prices.tokenPrices);
  let fxPrice = 0;
  if (prices) {
    const priceObj = prices.find((price) => price.symbol === "FX");
    if (priceObj) {
      fxPrice = priceObj.priceUSD;
    }
  }

  const delegationTableData = {
    group: "Delegations",
    headings: ["Validator", "Delegation", "Rewards", "Value"],
    subHeadings: ["Total Rewards Withdrawn", "Total Delegation Rewards"],
  };

  const fetchDelegationInfo = async (addr: string) => {
    setFetching(true);

    try {
      const cosmosAddress = await getCosmosAddress(addr!);
      if (!cosmosAddress) {
        setIsLoading0(false);
        setIsLoading1(false);
        setFetching(false);
      } else {
        const delegationRes = await retrieveDelegationInfo(
          cosmosAddress,
          fxPrice
        );
        if (delegationRes) {
          const { totalValue, rewardSum, delegations } = delegationRes;
          setTotalDelegationRewards(rewardSum.toString());
          setValue(totalValue.toNumber());
          setDelegationState(delegations);
        }
        const withdrawalRes = await retrieveWithdrawalInfo(addr!);
        if (withdrawalRes) {
          const { withdrawals } = withdrawalRes;
          setWithdrawnReward(withdrawals.toString());
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading0(false);
      setIsLoading1(false);
    }
  };

  const modifyValueString = (str: string) => {
    const indexOfDot = str.indexOf(".");
    return str.slice(0, indexOfDot + 6);
  };

  useEffect(() => {
    if (addr && !fetching) {
      fetchDelegationInfo(addr);
    }
  }, [addr]);

  useEffect(() => {
    onTotalDelegationsChange(value);
  }, [value, onTotalDelegationsChange]);

  const renderMobileBody0 = () => {
    if (value === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={6}
              sx={{ textAlign: "center", padding: 2, borderBottom: 0 }}
            >
              <Typography variant="subtitle1">
                {"----You do not have any ongoing delegations----"}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
    return (
      <>
        <Box>
          {delegationState &&
            Object.keys(delegationState).map((validator, index) => (
              <Card sx={{ backgroundColor: "rgb(26,26,26)" }}>
                <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "600" }}
                      >
                        {delegationState[validator].moniker}
                      </Typography>
                      <Typography variant="subtitle2">{`${validator.slice(
                        0,
                        5
                      )}...${validator.slice(-5)}`}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Grid container spacing={1} sx={{ marginTop: "8px" }}>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="subtitle1">
                            Delegation:
                          </Typography>
                          <Typography variant="subtitle1">
                            {delegationState[validator].amount!.slice(0, 5)}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="subtitle1">
                              {`$${modifyValueString(
                                delegationState[validator].value!
                              )}`}
                            </Typography>
                            <Box
                              component="img"
                              sx={{
                                height: "28px",
                                marginLeft: "5px",
                                alignSelf: "center",
                              }}
                              src={Constants.Tokens.Logos.FX}
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="subtitle1">Rewards:</Typography>
                          <Typography variant="subtitle1">
                            {delegationState[validator].reward!.slice(0, 5)}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="subtitle1">
                              {`$${modifyValueString(
                                delegationState[validator].rewardValue!
                              )}`}
                            </Typography>
                            <Box
                              component="img"
                              sx={{
                                height: "28px",
                                marginLeft: "5px",
                                alignSelf: "center",
                              }}
                              src={Constants.Tokens.Logos.FX}
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="subtitle1">Value:</Typography>
                          <Typography variant="subtitle1">
                            {`$${modifyValueString(
                              delegationState[validator].value!
                            )}`}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Box>
      </>
    );
  };

  const renderMobileBody1 = () => {
    if (withdrawnReward === 0 && totalDelegationRewards === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={6}
              sx={{ textAlign: "center", padding: 2, borderBottom: 0 }}
            >
              <Typography variant="subtitle1">
                {"----You do not have any ongoing delegations----"}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
    return (
      <>
        <Box>
          <Card sx={{ backgroundColor: "rgb(26,26,26)" }}>
            <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
              <Box>
                <Grid container spacing={1} sx={{ marginTop: "8px" }}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ maxWidth: '150px', whiteSpace: 'normal', wordWrap: 'break-word'}}>
                        Total Rewards Withdrawn:
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          component="img"
                          sx={{
                            height: "28px",
                            marginLeft: "5px",
                            alignSelf: "center",
                          }}
                          src={Constants.Tokens.Logos.FX}
                        />
                        <Typography variant="subtitle1">
                          {withdrawnReward.toString().slice(0, 5)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ maxWidth: '150px', whiteSpace: 'normal', wordWrap: 'break-word'}}>
                        Total Delegation Rewards:
                      </Typography>
                      <Typography variant="subtitle1">
                        {totalDelegationRewards.toString().slice(0,5)}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle1">
                          {`$${(
                            Number(totalDelegationRewards) * fxPrice
                          ).toFixed(5)}`}
                        </Typography>
                        <Box
                          component="img"
                          sx={{
                            height: "28px",
                            marginLeft: "5px",
                            alignSelf: "center",
                          }}
                          src={Constants.Tokens.Logos.FX}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </>
    );
  };

  const renderTableBody0 = () => {
    if (value === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={6}
              sx={{ textAlign: "center", padding: 2, borderBottom: 0 }}
            >
              <Typography variant="subtitle1">
                {"----You do not have any ongoing delegations----"}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
    return (
      <TableBody>
        {delegationState &&
          Object.keys(delegationState).map((validator, index) => (
            <TableRow key={index}>
              <StyledTableCell>
                <Box sx={{ display: "block" }}>
                  <Typography variant="h6">
                    {delegationState[validator].moniker}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: "250" }}>
                    {validator}
                  </Typography>
                </Box>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "block" }}>
                    <Typography variant="h6">
                      {delegationState[validator].amount!.slice(0, 12)}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: "250" }}>
                      {`$${modifyValueString(
                        delegationState[validator].value!
                      )}`}
                    </Typography>
                  </Box>
                  <Box
                    component="img"
                    sx={{
                      height: "28px",
                      marginLeft: "5px",
                      alignSelf: "center",
                    }}
                    src={Constants.Tokens.Logos.FX}
                  />
                </Box>
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
                      {delegationState[validator].reward!.slice(0, 12)}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: "250" }}>
                      {`$${modifyValueString(
                        delegationState[validator].rewardValue!
                      )}`}
                    </Typography>
                  </Box>
                  <Box
                    component="img"
                    sx={{
                      height: "28px",
                      marginLeft: "5px",
                      alignSelf: "center",
                    }}
                    src={Constants.Tokens.Logos.FX}
                  />
                </Box>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="h6">
                  {`$${modifyValueString(delegationState[validator].value!)}`}
                </Typography>
              </StyledTableCell>
              {/* <StyledTableCell align="right">
                            <Typography variant="subtitle1" sx={{ color: `${delegationState[validator].gainOrLoss![0] === "-" ? "red" : "green"}` }}>
                                {`$${modifyValueString(delegationState[validator].gainOrLoss!)}`}
                            </Typography>
                        </StyledTableCell> */}
            </TableRow>
          ))}
      </TableBody>
    );
  };

  const renderTableBody1 = () => {
    if (withdrawnReward === 0 && totalDelegationRewards === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={6}
              sx={{ textAlign: "center", padding: 2, borderBottom: 0 }}
            >
              {/* <Paper sx={{ borderRadius: 0 }}> */}
              <Typography variant="subtitle1">
                {"----You do not have any withdrawn and delegation rewards----"}
              </Typography>
              {/* </Paper> */}
            </TableCell>
          </TableRow>
        </TableBody>
      );
    } else {
      return (
        <TableBody>
          <TableRow>
            <StyledTableCell>
              <Box sx={{ display: "flex", alignItmes: "center" }}>
                <Box
                  component="img"
                  sx={{
                    height: "28px",
                    marginRight: "5px",
                    alignSelf: "center",
                  }}
                  src={Constants.Tokens.Logos.FX}
                />
                <Box sx={{ display: "block" }}>
                  <Typography variant="h6">
                    {withdrawnReward.toString().slice(0, 12)}
                  </Typography>
                </Box>
              </Box>
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
                  <Typography variant="h6">{totalDelegationRewards}</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: "250" }}>
                    {`$${(Number(totalDelegationRewards) * fxPrice).toFixed(
                      5
                    )}`}
                  </Typography>
                </Box>
                <Box
                  component="img"
                  sx={{
                    height: "28px",
                    marginLeft: "5px",
                    alignSelf: "center",
                  }}
                  src={Constants.Tokens.Logos.FX}
                />
              </Box>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      );
    }
  };

  return isMobile ? (
    <>
      {isLoading0 ? (
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
        <>
        {renderMobileBody0()}
        {renderMobileBody1()}
        </>
      )}
    </>
  ) : (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell size="medium">
              {delegationTableData.headings[0]}
            </StyledTableCell>
            {delegationTableData.headings.slice(1).map((heading, index) => {
              return (
                <StyledTableCell key={index} size="medium" align="right">
                  {heading}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        {isLoading0 ? (
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
          renderTableBody0()
        )}
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell size="medium" align="left">
              {delegationTableData.subHeadings[0]}
            </StyledTableCell>
            <StyledTableCell size="medium" align="right">
              {delegationTableData.subHeadings[1]}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        {isLoading1 ? (
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
          renderTableBody1()
        )}
      </Table>
    </Box>
  );
};

export default Delegations;
