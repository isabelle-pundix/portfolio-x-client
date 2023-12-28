"use client"

import { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import UserIcon from "@mui/icons-material/Person";
import { Button, Grid } from "@mui/material";
import { Logout } from "@mui/icons-material";
import AccountDetails from "./AccountDetails";
import { useAppDispatch, useAppSelector } from "../state/ReduxHooks";
import { logout } from "../state/authSlice";
import { useRouter } from "next/navigation";
import { removeUser, selectUser } from "../state/user/userSlice";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user._id === null) {
      router.push("/defisnapshot");
    }
  }, [user._id, router]);

  const logoutHandler = () => {
    router.push("/defisnapshot");
    localStorage.removeItem("walletAddress");
    dispatch(logout());
    dispatch(removeUser());
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Paper sx={{ borderRadius: 0, flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            paddingTop: "120px",
            justifyContent: "center",
          }}
        >
          <UserIcon />
          <Typography variant="h4" paddingLeft="15px">
            Profile
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            paddingTop: "30px",
            paddingLeft: "50px",
            paddingRight: "50px",
            paddingBottom: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid item>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h5">Account Details</Typography>
                  {user._id != null ?  <AccountDetails /> : null}
                 

                  <Button color="error" onClick={logoutHandler}>
                    <Logout sx={{ marginRight: "5px" }} />
                    Logout
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
