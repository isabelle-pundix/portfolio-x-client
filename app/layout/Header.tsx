"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CustomButton from "../components/buttons/CustomButton";
import SwipeableTemporaryDrawer from "../components/buttons/MenuDrawer";
import Divider from "@mui/material/Divider";
import UserWalletAdd from "../wallet/UserWalletAdd";
import { useAppSelector } from "../state/ReduxHooks";
import { selectUser } from "../state/user/userSlice";

const Header = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  const user = useAppSelector(selectUser);

  return (
    <AppBar
      elevation={5}
      sx={{ top: 0, border: 0, backgroundColor: "rgb(26,26,26)" }}
    >
      <Toolbar sx={{ minHeight: 70 }}>
        <SwipeableTemporaryDrawer />
        <Box alignItems="center" justifyContent="space-between">
          <Typography
            variant="h3"
            sx={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            Portfolio X
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box alignItems="center" sx={{ display: { xs: "none", sm: "flex" } }}>
          <CustomButton
            link="https://starscan.io/"
            external={true}
            icon={<TravelExploreIcon />}
            text="Explorer"
          />
        </Box>

        {user._id !== null && (
          <>
            
            <Divider
              orientation="vertical"
              sx={{
                height: 32,
                mx: 2,
                display: { lg: "flex" },
              }}
            />
            <UserWalletAdd showAddress={true} />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
