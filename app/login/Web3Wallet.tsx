"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useConnect, useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "../state/ReduxHooks";
import { useIsMounted } from "../hooks/useIsMounted";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ExtensionIcon from "@mui/icons-material/Extension";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import WALLETCONNECT_ICON_URL from "../assets/images/walletConnectIcon.svg";
import METAMASK_ICON_URL from "../assets/images/metamask.png";
import coinbaseIcon from "../assets/images/coinbaseIcon.png";
import Image from "next/image";
import { walletLogin } from "../state/authSlice";
import { fetchAndUpdateUser } from "../state/user/userSlice";
import { disconnect } from "@wagmi/core";
import useMediaQuery from "@mui/material/useMediaQuery";
import { selectAllWalletAddresses } from "../state/walletAddress/walletAddressSlice";

const Web3Wallet = () => {
  const dispatch = useAppDispatch();
  const isMounted = useIsMounted();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : "500",
    bgcolor: theme.palette.background.default,
    border: "1px #000",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  };

  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { address, connector, isConnected } = useAccount({
    onConnect() {
      handleCloseModal();
    },
  });

  const handleOpenModal = () => {
    setOpenWalletModal(true);
  };

  const handleCloseModal = () => {
    setOpenWalletModal(false);
  };

  const walletAddresses = useAppSelector(selectAllWalletAddresses);

  useEffect(() => {
    if (address != undefined && address.length > 0) {
      dispatch(walletLogin(address)).then(() => {
        const storageChangeEvent = new Event("storage");
        localStorage.setItem("walletAddress", address);
        window.dispatchEvent(storageChangeEvent);
        dispatch(fetchAndUpdateUser());
      });
    }
  }, [address]);

  const renderModal = () => {
    if (isConnected && connector) {
      let logo: any;
      if (connector.name === "WalletConnect") {
        logo = (
          <Image src={WALLETCONNECT_ICON_URL} width={24} alt="WalletConnect" />
        );
      } else if (connector.name === "MetaMask") {
        logo = <Image src={METAMASK_ICON_URL} width={24} alt="Metamask" />;
      } else {
        logo = <ExtensionIcon fontSize={"medium"} />;
      }
      const addressTruncated =
        address!.substring(0, 7) + " . . . " + address!.slice(-5);
      return (
        <Box sx={style} display={"grid"}>
          <Typography fontSize={20} paddingBottom={"5px"}>
            Wallet Connected
          </Typography>
          <Box
            display={"grid"}
            sx={{
              border: "1px solid #424549",
              borderRadius: 1,
              padding: "5px",
            }}
          >
            <Box display={"flex"}>
              {logo}
              <Box sx={{ marginLeft: "5px" }}>
                <Typography variant={"subtitle2"}>
                  {addressTruncated}
                </Typography>
              </Box>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ paddingTop: "5px" }}
            >
              <Typography variant="subtitle2" color="#424549">
                {`Connected with ${connector.name}`}
              </Typography>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 4,
                  borderColor: (theme) => theme.palette.text.primary,
                }}
                onClick={() => disconnect()}
              >
                <Typography
                  fontSize={12}
                  variant="subtitle1"
                  sx={{ color: (theme) => theme.palette.text.primary }}
                >
                  Disconnect
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      );
    }
    return (
      <Box sx={style} display={"grid"}>
        <Typography fontSize={20} paddingBottom={"5px"}>
          Connect with Wallet
        </Typography>
        <Box paddingBottom={"10px"}>
          <Paper elevation={3}>
            <Box padding={"8px"}>
              <Typography fontSize={14} variant="caption">
                By connecting a wallet, you agree to Function X{" "}
                <Link href="https://functionx.io/home">Terms of Service</Link>{" "}
                and acknowledge that you have read and understand the{" "}
                <Link href="https://functionx.io/home">
                  Function X protocol disclaimer
                </Link>
                .
              </Typography>
            </Box>
          </Paper>
        </Box>
        {connectors.map((connector) => (
          <Button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
            startIcon={
              connector.name === "WalletConnect" ? (
                <Image
                  src={WALLETCONNECT_ICON_URL}
                  width={18}
                  alt="WalletConnect"
                />
              ) : connector.name === "Coinbase Wallet" ? (
                <Image src={coinbaseIcon} width={18} alt="Coinbase" />
              ) : connector.name === "MetaMask" ? (
                <Image src={METAMASK_ICON_URL} width={18} alt="Metamask" />
              ) : (
                <ExtensionIcon />
              )
            }
            sx={{ alignItems: "center" }}
          >
            <Typography
              fontSize={14}
              variant="caption"
              sx={{ color: (theme) => theme.palette.text.primary }}
            >
              {connector.name}
              {isMounted && !connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting...)"}
            </Typography>
          </Button>
        ))}
      </Box>
    );
  };

  return (
    <Box>
      <Button
        fullWidth
        variant="outlined"
        sx={{
          mb: 2,
          color: (theme) => theme.palette.primary.contrastText,
          borderColor: (theme) => theme.palette.primary.contrastText,
          "&:hover": {
            color: (theme) => theme.palette.primary.main,
            borderColor: (theme) => theme.palette.primary.main,
          },
        }}
        onClick={handleOpenModal}
      >
        Connect Wallet
      </Button>
      <Modal open={openWalletModal} onClose={handleCloseModal}>
        {renderModal()}
      </Modal>
    </Box>
  );
};

export default Web3Wallet;
