import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface DotsMobileStepperProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function DotsMobileStepper({
  activeStep,
  setActiveStep,
}: DotsMobileStepperProps) {
  const theme = useTheme();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant="dots"
      steps={5}
      position="static"
      activeStep={activeStep}
      sx={{
        maxWidth: 400,
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        "& .MuiMobileStepper-dot": {
          backgroundColor: theme.palette.text.primary, // color for dots
        },
        "& .MuiMobileStepper-dotActive": {
          backgroundColor: theme.palette.primary.main, // color for active dot
        },
      }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 4}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </Button>
      }
    />
  );
}
