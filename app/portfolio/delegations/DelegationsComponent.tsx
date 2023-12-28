import { Grid, Box, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import Delegations from "../Delegations";

const DelegationsComponent = () => {

  const [totalValue, setTotalValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(interval);
  }, []);  

  const handleTotalDelChange = (value: number) => {
    setTotalValue(value)
  }

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
                Total Delegations Value:
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
                  ${totalValue.toLocaleString()}
                </Typography>
              )}
            </Box>
            <Card sx={{ backgroundColor: "rgb(26,26,26)" }}>
              <CardContent>
                <Delegations onTotalDelegationsChange={handleTotalDelChange}/>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DelegationsComponent;
