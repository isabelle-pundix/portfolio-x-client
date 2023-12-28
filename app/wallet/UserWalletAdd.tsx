import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Icon } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAppSelector, useAppDispatch } from "../state/ReduxHooks";
import { selectUser } from "../state/user/userSlice";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { WalletAddress, WalletAddressModel, selectAllWalletAddresses } from "../state/walletAddress/walletAddressSlice";
import { ShortWalletAddressNameGenerator } from "../profile/WalletAddressNameGenerator";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddWeb3Wallet from "./AddWeb3Wallet";

interface Props {
  showAddress?: boolean;
}

const UserWalletAdd: React.FC<Props> = ({ showAddress }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const user = useAppSelector(selectUser);
  const walletAddress =
    typeof window !== "undefined"
      ? window.localStorage.getItem("walletAddress")
      : null;

  // const walletAddresses: WalletAddress[] = useAppSelector(selectAllWalletAddresses);

  // const walletAddresses: WalletAddressModel[] = user.walletAddresses;

  const allWalletAddresses: WalletAddress[] = useAppSelector(selectAllWalletAddresses);

  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);

  useEffect(() => {
    if (walletAddress != null) {
      setSelectedAddress(
        `${walletAddress.substring(0, 5)}...${walletAddress.substring(
          walletAddress.length - 5
        )}`
      );
    }
  }, [walletAddress, selectedAddress]);

  const setSelectedAddressHandler = (walletAddress: string, index: number) => {
    console.log("Wallet address selected: ", walletAddress);
    const selectedAddObj: WalletAddress = allWalletAddresses[index];
    console.log("Wallet address selected obj: ", selectedAddObj);
    const selectedAddStr: string = selectedAddObj.walletAddress;
    console.log("Wallet address selected string: ", selectedAddStr);
    setSelectedAddress(walletAddress);
    const storageChangeEvent = new Event("storage");
    localStorage.setItem("walletAddress", selectedAddStr);
    window.dispatchEvent(storageChangeEvent);
  };

  let showAddr = true;
  if (!showAddress) {
    showAddr = false;
  }

  const shortUserAddressKVP: WalletAddress[] =
    ShortWalletAddressNameGenerator(allWalletAddresses);

  const userAddress = () => {
    return (
      <Typography
        sx={{
          color: theme.palette.primary.contrastText,
          fontSize: theme.typography.subtitle1,
          fontWeight: "500",
          mr: 2,
          "&:hover": {
            color: theme.palette.primary.main,
          },
          "& svg": {
            mr: 0.5,
          },
        }}
      >
        {selectedAddress}
      </Typography>
    );
  };

  const StyledListbox = styled("ul")(
    ({ theme }) => `
    box-sizing: border-box;
    padding: 6px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background-color: ${theme.palette.background.default};
    z-index: 1;
    `
  );

  const StyledMenuItem = styled(MenuItem)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;
    
      &:hover:not(.${menuItemClasses.disabled}) {
        color: (theme) => theme.palette.primary.contrastText
      }
    `
  );

  const TriggerButton = styled(MenuButton)(
    ({ theme }) => `
    background-color: ${theme.palette.background.default};
    border: none;
    `
  );

  const handleOpenModalAddWallet = () => {
    setOpenWalletModal(true);
    console.log("add wallet selected");
  };

  const handleCloseModalAddWallet = () => {
    setOpenWalletModal(false);
  };

  return (
    <Box>
      <Dropdown>
        <TriggerButton>{showAddr ? userAddress() : null}</TriggerButton>
        <Menu slots={{ listbox: StyledListbox }}>
          {shortUserAddressKVP.map((pair, index) => (
            <StyledMenuItem
              key={index}
              onClick={() =>
                setSelectedAddressHandler(pair.walletAddress, index)
              }
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
            >
              <div>
                <Typography>{pair.name}</Typography>
              </div>
              <div>
                <Typography variant="subtitle1">
                  {pair.walletAddress}
                </Typography>
              </div>
            </StyledMenuItem>
          ))}
          <StyledMenuItem
            onClick={handleOpenModalAddWallet}
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
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon style={{ margin: "2px" }}>
                <AddCircleOutlineIcon />
              </Icon>
              <Typography
                sx={{
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.background.default,
                    "& .MuiTypography-root": {
                      color: (theme) => theme.palette.primary.main,
                    },
                    "& .MuiSvgIcon-root": {
                      color: (theme) => theme.palette.primary.main,
                    },
                  },
                }}
              >
                Add wallet
              </Typography>
            </div>
          </StyledMenuItem>
        </Menu>
      </Dropdown>
      <AddWeb3Wallet setError={() => {}} setErrorMsg={() => {}} openModal={handleOpenModalAddWallet} closeModal={handleCloseModalAddWallet} isWalletModalOpen={openWalletModal}/>
    </Box>
  );
};

export default UserWalletAdd;