import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import InsightsIcon from "@mui/icons-material/Insights";
import UserIcon from "@mui/icons-material/Person";
import { useAppSelector } from "@/app/state/ReduxHooks";
import { selectUser } from "@/app/state/user/userSlice";

type Anchor = "left";

export default function SwipeableTemporaryDrawer() {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const handleItemSelection = (index: number) => {
    console.log("Item selected index: ", index);

    switch (index) {
      case 0:
        router.push("/assetdashboard");
        break;
      case 1:
        router.push("/wallet");
        break;
      case 2:
        router.push("/portfolio");
        break;
      case 3:
        router.push("/defisnapshot");
        break;
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Asset Dashboard", "Wallet", "Portfolio", "DeFi Snapshot"].map(
          (text, index) => (
            <ListItem
              key={text}
              sx={{
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.background.default,
                  "& .MuiTypography-root": {
                    color: (theme) => theme.palette.primary.main,
                  },
                  "& .MuiSvgIcon-root": {
                    color: (theme) => theme.palette.primary.main,
                  },
                },
              }}
              onClick={() => handleItemSelection(index)}
            >
              <ListItemButton>
                <ListItemIcon>
                  {(() => {
                    switch (index) {
                      case 0:
                        return <DataUsageIcon />;
                      case 1:
                        return <AccountBalanceWalletIcon />;
                      case 2:
                        return <ScatterPlotIcon />;
                      case 3:
                        return <InsightsIcon />;
                    }
                  })()}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      {user._id !== null && (
        <>
          <Divider />
          <List>
            <ListItem
              sx={{
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.background.default,
                  "& .MuiTypography-root": {
                    color: (theme) => theme.palette.primary.main,
                  },
                  "& .MuiSvgIcon-root": {
                    color: (theme) => theme.palette.primary.main,
                  },
                },
              }}
              onClick={() => handleProfileClick()}
            >
              <ListItemButton>
                <ListItemIcon>
                  <UserIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Button
          onClick={toggleDrawer("left", true)}
          sx={{ color: (theme) => theme.palette.primary.contrastText }}
        >
          <MenuIcon />
        </Button>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
