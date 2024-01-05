import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { LinearProgress, TableBody } from "@mui/material";
import { Logos } from "../constants/Tokens";
import { useWalletData } from "../utils/calculateWalletValue";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import Image from "next/image";

const headings = ["Token", "Balance", "Value"];

interface DashboardHeaderTotalProps {
  onTotalHoldings: (arg: number) => void;
  loading: (arg: boolean) => void;
}

function WalletCard({
  onTotalHoldings,
  loading,
}: DashboardHeaderTotalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const updatedBalances = useWalletData();

  // Sum of token value
  const [tokenValueSum, setTokenValueSum] = useState(0);

  // isLoading
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); 
    loading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
      loading(false);
    }, 15000);
    return () => {
      clearTimeout(timeout);
    };
  }, [updatedBalances])

  useEffect(() => {
    loading(isLoading);
  }, [isLoading]);

  useEffect(() => {  
    if (updatedBalances) {
      const sumOfTokenValue = updatedBalances.reduce((result, item) => {
        return result + item.tokenValue;
      }, 0);
      setTokenValueSum(sumOfTokenValue);
      onTotalHoldings(sumOfTokenValue);
    }
  
  }, [updatedBalances]);

  const renderData = () => {
    return updatedBalances && updatedBalances.length > 0 ? (
      <Box>
        <Card
          sx={{ backgroundColor: "rgb(26,26,26)" }}
        >
          <CardContent>
            <Table size={isMobile ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  {headings.map((heading, index) => {
                    const cellAlignment = index === 0 ? "left" : "right";
                    return (
                      <TableCell
                        key={index}
                        size="medium"
                        align={cellAlignment}
                      >
                        <Typography variant={isMobile ? "subtitle2" : "h5"}>{heading}</Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {updatedBalances.map((rowData, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="left"
                      size="small"
                      sx={{ borderBottom: 0 }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Image
                          src={
                            Logos[rowData.tokenSymbol as keyof typeof Logos] ||
                            ""
                          }
                          alt=""
                          width={30}
                          height={30}
                          style={{ marginRight: "10px" }}
                        />
                        <Typography variant={isMobile ? "subtitle2" : "h6"}>
                          {rowData.tokenSymbol}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ borderBottom: 0 }}>
                      <Typography variant={isMobile ? "subtitle2" : "h6"}>
                        {`${Number(rowData.tokenBalance).toLocaleString(
                          "en-US",
                          {
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                          }
                        )}`}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ borderBottom: 0 }}>
                      <Typography variant={isMobile ? "subtitle2" : "h6"}>
                        {`${Number(rowData.tokenValue).toLocaleString("en-US", {
                          minimumFractionDigits: 3,
                          maximumFractionDigits: 3,
                        })}`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    ) : null;
  };

  return isLoading ? (
    <Box>
      <Card
        sx={{ backgroundColor: "rgb(26,26,26)" }}
      >
        <CardContent>
          <Table>
            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>Loading...</Typography>
            <LinearProgress color="inherit" />
          </Table>
        </CardContent>
      </Card>
    </Box>
  ) : (
    renderData()
  );
}

export default WalletCard;
