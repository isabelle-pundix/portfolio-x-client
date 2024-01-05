import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { useTheme } from "@mui/material/styles";
import ExtensionIcon from "@mui/icons-material/Extension";
import WALLETCONNECT_ICON_URL from "../assets/images/walletConnectIcon.svg";
import coinbaseIcon from "../assets/images/coinbaseIcon.png";
import METAMASK_ICON_URL from "../assets/images/metamask.png";
import { useAppDispatch } from "../state/ReduxHooks";
import { useIsMounted } from "../hooks/useIsMounted";
import Image from "next/image";
import { addWalletAddress } from "../state/walletAddress/walletAddressSlice";
import { fetchAndUpdateUser } from "../state/user/userSlice";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Web3WalletProp {
  setError: (val: boolean) => void;
  setErrorMsg: (val: string) => void;
  openModal: () => void;
  closeModal: () => void;
  isWalletModalOpen: boolean;
}

//Parent component that inherits Web3Wallet should have state for error and error message
const AddWeb3Wallet: React.FC<Web3WalletProp> = ({
  setError,
  setErrorMsg,
  openModal,
  closeModal,
  isWalletModalOpen,
}) => {
  const dispatch = useAppDispatch();
  const isMounted = useIsMounted();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? '90%': '500',
    bgcolor: theme.palette.background.default,
    border: "1px #000",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  };

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { address, connector, isConnected } = useAccount({
    onConnect() {
      setError(false);
      setErrorMsg("");
      handleCloseModal();
      disconnect();
    },
  });

  const handleOpenModal = () => {
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
  };

  useEffect(() => {
    if (address != undefined) {
      dispatch(addWalletAddress({ walletAddress: address })).then(() => {
        const storageChangeEvent = new Event("storage");
        localStorage.setItem("walletAddress", address);
        window.dispatchEvent(storageChangeEvent);
        dispatch(fetchAndUpdateUser());
      });
    }
  }, [address, dispatch]);

  useEffect(() => {
    if (error) {
      setError(true);
      setErrorMsg(error.message);
    }
  }, [error]);

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
          <Typography paddingBottom={"5px"}>Wallet Connected</Typography>
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
              {/* <Button
                size="small"
                variant="outlined"
                sx={{ borderRadius: 4 }}
                onClick={() => disconnect()}
              >
                Disconnect
              </Button> */}
            </Box>
          </Box>
        </Box>
      );
    }
    return (
      <Box sx={style} display={"grid"}>
        <Typography fontSize={20} paddingBottom={"5px"}>
          Add Wallet Address
        </Typography>
        <Box paddingBottom={"10px"}>
          <Paper elevation={3}>
            <Box padding={"8px"}>
              <Typography fontSize={14} variant="caption">
                By adding a wallet, you agree to Function X{" "}
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
      <Modal open={isWalletModalOpen} onClose={handleCloseModal}>
        {renderModal()}
      </Modal>
    </Box>
  );
};

export default AddWeb3Wallet;
