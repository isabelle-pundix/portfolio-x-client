import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Collapse from "@mui/material/Collapse";
import DataTable from "./DataTable";
import CircularProgress from "@mui/material/CircularProgress";
import { Card, CardContent } from "@mui/material";

interface AccordionTableProps {
  dataComponent: React.ReactNode | null;
  subtitle?: string;
  loading?: boolean;
}

const AccordionTable: React.FC<AccordionTableProps> = ({
  dataComponent,
  subtitle,
  loading,
}) => {
  var subtitle_: string;
  if (subtitle) {
    subtitle_ = subtitle;
  }
  
  return (
    <Box>
      <Card sx={{ backgroundColor: "rgb(26,26,26)" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              position: "relative",
              alignItems: "center",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: "10px",
                alignItems: "center",
                flex: "1 1 0",
              }}
            >
              <Typography variant="h4"></Typography>
              {loading ? (
                <CircularProgress color="inherit" size="1.5rem" />
              ) : (
                <Typography variant="h4"></Typography>
              )}
            </Box>
            <DataTable dataComponent={dataComponent} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AccordionTable;
