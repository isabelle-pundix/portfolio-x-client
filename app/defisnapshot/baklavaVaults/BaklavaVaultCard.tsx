import { Constants } from "@/app/constants";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import LPIcon from "../LPIcon";
import { getTokenMetaData2 } from "@/app/utils/Token";
import LPIconSingle from "../LPIconSingle";
import ChipsArray from "./BaklavaVaultsChips";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Grid } from "@mui/material";
import { getBaklavaVaultMetrics } from "@/app/utils/Metrics";
import { useAppDispatch, useAppSelector } from "@/app/state/ReduxHooks";
import {
  fetchFXCore,
  selectFXCoreData,
  FXCoreVaultSnapshot
} from "@/app/state/metrics/FXCoreMetricsSlice";
import {
  fetchFXSwap,
  selectFXSwapData,
} from "@/app/state/metrics/FXSwapMetricsSlice";
import {
  fetchPangolin,
  selectPangolinData,
} from "@/app/state/metrics/PangolinMetricsSlice";
import {
  fetchTraderJoe,
  selectTraderJoeData,
} from "@/app/state/metrics/TraderJoeMetricsSlice";
import { useMemo } from "react";
import { fetchBava, selectBavaData } from "@/app/state/metrics/BavaMetricsSlice";
import { fetchGlp, selectGlpData } from "@/app/state/metrics/GlpMetricsSlice";
import { fetchUsdc, selectUsdcData } from "@/app/state/metrics/USDCMetricsSlice";
import { BaklavaVaultSnapshot } from "@/app/constants/Baklava/BaklavaVaultSnapshot";

interface BaklavaVaultCardProps {
  calculateTvl: (arg: number[]) => void;
}

const headings = Constants.BaklavaVaultSnapshot.BaklavaVaultsHeadings;

const BaklavaVaultCard: React.FC<BaklavaVaultCardProps> = ({ calculateTvl }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();

  // Get Data
  const [localCombinedData, setLocalCombinedData] = useState<BaklavaVaultSnapshot[]>([]);
  const [filteredVaults, setFilteredVaults] = useState<BaklavaVaultSnapshot[]>([]);

  const fxSwapData = useAppSelector(selectFXSwapData);
  const pangolinData = useAppSelector(selectPangolinData);
  const traderJoeData = useAppSelector(selectTraderJoeData);
  const fxCoreData = useAppSelector(selectFXCoreData);
  const bavaData = useAppSelector(selectBavaData);
  const glpData = useAppSelector(selectGlpData);
  const usdcData = useAppSelector(selectUsdcData);

  const combinedData = useMemo(() => [
    ...fxSwapData,
    ...(Array.isArray(fxCoreData) ? fxCoreData : [fxCoreData]),
    ...(Array.isArray(glpData) ? glpData : [glpData]),
    ...(Array.isArray(usdcData) ? usdcData : [usdcData]),
    ...pangolinData,
    ...traderJoeData,
    ...(Array.isArray(bavaData) ? bavaData : [bavaData]),
  ], [fxSwapData, pangolinData, traderJoeData, fxCoreData, bavaData, glpData, usdcData]);

  const mappedData = useMemo(() => combinedData.map((vault) => ({
    ...vault,
    token0: getTokenMetaData2(vault.token0),
    token1: vault.token1 ? getTokenMetaData2(vault.token1) : null,
  })), [combinedData]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchFXSwap());
      dispatch(fetchPangolin());
      dispatch(fetchTraderJoe());
      dispatch(fetchFXCore());
      dispatch(fetchBava());
      dispatch(fetchGlp());
      dispatch(fetchUsdc())
    };
  
    fetchData();
  
    const intervalId = setInterval(() => {
      fetchData();
    }, 300000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []); 

  useEffect(() => {
    if (mappedData.length > 0) {
        setLocalCombinedData(mappedData)
        setFilteredVaults(mappedData);
    }
  }, [mappedData])

  const handleBaklavaIndexChange = (activeIndices: number[]) => {
    const filteredCategories = localCombinedData.filter((vault, index) =>
      activeIndices.includes(vault.vaultCategory)
    );
    setFilteredVaults(filteredCategories);
  };


  useEffect(() => {
    calculateTvl(filteredVaults.map((vault) => vault.tvl));
  }, [filteredVaults]);

  return (
    <Box sx={{ paddingBottom: "30px" }}>
      <Box>
        <ChipsArray
          onActiveIndexesChange={handleBaklavaIndexChange}
        ></ChipsArray>
      </Box>
      <div style={{ paddingBottom: "16px" }}></div>
      {isMobile ? (
        <Box>
          {filteredVaults.map((vault, index) => (
            <Card
              sx={{ backgroundColor: "rgb(26,26,26)", marginBottom: "16px" }}
            >
              <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {vault.token1 != null ? (
                    <LPIcon
                      token0Src={vault.token0.logoUrl}
                      token1Src={vault.token1.logoUrl}
                    />
                  ) : (
                    <LPIconSingle token0Src={vault.token0.logoUrl} />
                  )}
                  <Box sx={{ display: "block", flex: 1 }}>
                    <Typography variant="h6">{vault.vaultName}</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: "250" }}>
                      <Link
                        href={vault.url}
                        style={{ color: "white" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {`${vault.id.slice(0, 12)}...`}
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
                <Box>
                  <Grid container spacing={1} sx={{ marginTop: "8px" }}>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          backgroundColor:
                            Constants.BaklavaVaultSnapshot
                              .BaklavaVaultsCategoriesColors[
                              vault.vaultCategory
                            ],
                          padding: "5px",
                          borderRadius: "4px",
                        }}
                      >
                        {
                          Constants.BaklavaVaultSnapshot
                            .BaklavaVaultsCategories[vault.vaultCategory]
                        }
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="subtitle1">{`APY: ${Number(
                        vault.apy
                      ).toFixed(2)} %`}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="subtitle1">{`TVL: $ ${Number(
                        vault.tvl
                      ).toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })}`}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Card sx={{ backgroundColor: "rgb(26,26,26)" }}>
          <CardContent>
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
                {filteredVaults.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell size="small" sx={{ borderBottom: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {row.token1 != null ? (
                          <LPIcon
                            token0Src={row.token0.logoUrl}
                            token1Src={row.token1.logoUrl}
                          />
                        ) : (
                          <LPIconSingle token0Src={row.token0.logoUrl} />
                        )}

                        <Box sx={{ display: "block", flex: 1 }}>
                          <Box>
                            <Typography variant="h6">
                              {row.vaultName}
                            </Typography>
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
                      <Typography variant="subtitle2">
                        <span
                          style={{
                            backgroundColor:
                              Constants.BaklavaVaultSnapshot
                                .BaklavaVaultsCategoriesColors[
                                row.vaultCategory
                              ],
                            padding: "5px",
                            borderRadius: "4px",
                          }}
                        >
                          {
                            Constants.BaklavaVaultSnapshot
                              .BaklavaVaultsCategories[row.vaultCategory]
                          }
                        </span>
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
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default BaklavaVaultCard;
