import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, Fade } from "@mui/material";
import { AlertColor } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/state/ReduxHooks";
import { closeAlert } from "@/app/state/alertSlice";

interface AlertCompProps {
  title?: string;
  message?: string;
  severity?: AlertColor | undefined;
}

const AlertComp: React.FC<AlertCompProps> = () => {
  const alert = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(closeAlert(false));
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [alert, dispatch]);

  return (
    <Fade in={alert.alert}>
      <Alert
        severity={alert.severity}
        variant="standard"
        className="alert"
        sx={{
          position: "absolute", 
          left: "50%", 
          transform: "translateX(-50%)", 
          display: "inline-flex",
          flexDirection: "row",
        }}
      >
        <AlertTitle sx={{ marginBottom: 0 }}>{alert.title}</AlertTitle>
        {alert.message}
      </Alert>
    </Fade>
  );
};

export default AlertComp;
