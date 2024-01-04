"use client";

import { useAppDispatch, useAppSelector } from "../state/ReduxHooks";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  FullWalletAddressNameGenerator,
  ShortWalletAddressNameGenerator,
} from "./WalletAddressNameGenerator";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Alert,
  TextField,
  Card,
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LongMenu from "./WalletOptions";
import {
  WalletAddress,
  deleteWalletAddress,
  editWalletAddress,
  selectAllWalletAddresses,
} from "../state/walletAddress/walletAddressSlice";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { fetchAndUpdateUser, selectUser } from "../state/user/userSlice";
import { useTheme } from "@mui/material/styles";
import AlertComp from "../assetdashboard/privatenotes/Alert/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";

const AccountDetails = () => {
  const dispatch = useAppDispatch();
  const [receivedSelection, setReceivedSelection] = useState<string>("");
  const [renderSummary, setRenderSummary] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  // const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogeOpen, setEditDialogOpen] = useState(false);
  const [newWalletName, setNewWalletName] = useState<string>("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const allWalletAddresses = useAppSelector(selectAllWalletAddresses);

  const user = useAppSelector(selectUser);
  const userAddress =
    typeof window !== "undefined"
      ? window.localStorage.getItem("walletAddress")
      : null;
  const [fullUserAddressKVP, setFullUserAddressKVP] = useState<WalletAddress[]>(
    []
  );

  const [shortUserAddressKVP, setShortUserAddressKVP] = useState<
    WalletAddress[]
  >([]);

  useEffect(() => {
    setFullUserAddressKVP(FullWalletAddressNameGenerator(allWalletAddresses));
    setShortUserAddressKVP(ShortWalletAddressNameGenerator(allWalletAddresses));
  }, [allWalletAddresses]);

  useEffect(() => {
    if (receivedSelection === "Details") {
      setRenderSummary(false);
    } else if (receivedSelection === "Delete" && selectedIndex != null) {
      confirmDeleteWallet();
    }
  }, [receivedSelection, selectedIndex]);

  const viewAllWalletsHandler = () => {
    setRenderSummary(true);
  };

  const walletSummary = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {shortUserAddressKVP.map((pair, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <div style={{ flex: "1", textAlign: "center", width: "200px" }}>
              <Typography sx={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  minWidth: 0,
                  flexShrink: 1
                }}>{pair.name}</Typography>
            </div>
            <div
              style={{
                flex: "1",
                textAlign: "center",
                width: "200px",
              }}
            >
              <Typography variant="subtitle1">{pair.walletAddress}</Typography>
            </div>
            <div>
              <LongMenu
                sendSelectionLabel={(selectedLabel) =>
                  handleSelectionLabel(selectedLabel, index)
                }
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const walletDetails = (index: number) => {
    if (index < 0 || index >= fullUserAddressKVP.length) {
      return null;
    }

    const pair = fullUserAddressKVP[index];

    return (
      <div>
        <Box paddingBottom="10px">
          <Button
            variant="outlined"
            sx={{
              color: "success.main",
              borderColor: "success.main",
              "&:hover": { borderColor: "success.main" },
            }}
            startIcon={<ArrowBackIosNewIcon color="success" />}
            onClick={viewAllWalletsHandler}
          >
            All Wallets
          </Button>
        </Box>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                maxWidth: isMobile ? "100px" : "100%",
              }}
            >
              <Typography
                variant={isMobile ? "subtitle2" : "body1"}
                sx={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  minWidth: 0,
                  flexShrink: 1
                }}
              >
                {pair.name}
              </Typography>
              <IconButton onClick={() => confirmEditWalletName()}>
                <EditIcon sx={{ color: "white" }} />
              </IconButton>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", maxWidth: isMobile ? "250px" : "100%", }}>
              <Typography
                variant={isMobile ? "subtitle2" : "subtitle1"}
                sx={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  minWidth: 0,
                  flexShrink: 1
                  
                }}
              >
                {pair.walletAddress}
              </Typography>

              <IconButton
                onClick={() => handleCopyWalletAddress(pair.walletAddress)}
              >
                <ContentCopyIcon sx={{ color: "white" }} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleCopyWalletAddress = (walletAddress: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = walletAddress;

      document.body.appendChild(textArea);

      textArea.select();
      document.execCommand("copy");
      setIsCopied(true);
      document.body.removeChild(textArea);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy wallet address:", error);
    }
  };

  const handleDeleteWalletDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const confirmDeleteWallet = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteWallet = () => {
    setDeleteDialogOpen(false);
    if (selectedIndex != null) {
      const walletAddressToDelete = fullUserAddressKVP[selectedIndex];
      dispatch(deleteWalletAddress(walletAddressToDelete.id)).then((result) => {
        if (deleteWalletAddress.fulfilled.match(result)) {
          dispatch(fetchAndUpdateUser());

          if (walletAddressToDelete.walletAddress === userAddress) {
            const newDefaultAddress = fullUserAddressKVP[0].walletAddress;
            const storageChangeEvent = new Event("storage");
            localStorage.setItem("walletAddress", newDefaultAddress);
            window.dispatchEvent(storageChangeEvent);
          }
          // await render
          setRenderSummary(true);
        } else if (deleteWalletAddress.rejected.match(result)) {
          const error = result.payload;
          console.error("Failed to delete wallet address:", error);
        }
      });
    }
  };

  const handleEditWalletDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditWalletName = () => {
    setEditDialogOpen(false);
    if (selectedIndex != null) {
      const walletAddressToEdit = fullUserAddressKVP[selectedIndex];
      const updatedWalletAddress = {
        ...walletAddressToEdit,
        name: newWalletName,
      };
      dispatch(editWalletAddress(updatedWalletAddress)).then((result) => {
        if (editWalletAddress.fulfilled.match(result)) {
          setRenderSummary(true);
          dispatch(fetchAndUpdateUser());
        } else if (editWalletAddress.rejected.match(result)) {
          const error = result.payload;
          console.error("Failed to edit wallet address:", error);
        }
      });
    }
  };

  const confirmEditWalletName = () => {
    setEditDialogOpen(true);
  };

  const handleSelectionLabel = (selectedLabel: string, index: number) => {
    setReceivedSelection(selectedLabel);
    setSelectedIndex(index);
  };

  const summary = walletSummary();
  const details = selectedIndex != null ? walletDetails(selectedIndex) : null;

  return (
    <div>
      <Modal
        open={deleteDialogOpen}
        onClose={handleDeleteWalletDialogClose}
        aria-labelledby="Confirm delete"
        aria-describedby="Click the button to confirm delete"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 200,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            spacing: "20px",
            padding: 0,
          }}
        >
          <Button
            variant="contained"
            onClick={handleDeleteWallet}
            sx={{ backgroundColor: theme.palette.primary.dark }}
          >
            Confirm Delete
          </Button>
        </Box>
      </Modal>

      <Modal
        open={editDialogeOpen}
        onClose={handleEditWalletDialogClose}
        aria-labelledby="input-modal"
        aria-describedby="input note for add/edit"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: 400,
            width: "70%",
            maxWidth: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            spacing: "20px",
          }}
        >
          <TextField
            label="New Wallet Name"
            variant="outlined"
            fullWidth
            value={newWalletName}
            onChange={(event) => setNewWalletName(event.target.value)}
            sx={{ display: "block" }}
          />
          <Button
            variant="contained"
            onClick={handleEditWalletName}
            sx={{
              marginLeft: "auto",
              marginTop: "20px",
              backgroundColor: theme.palette.primary.dark,
            }}
          >
            Save
          </Button>
        </Box>
      </Modal>

      <AlertComp />

      <Card
        sx={{
          backgroundColor: "rgb(26,26,26)",
          margin: "24px 0 24px 0",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          rowGap: "12px",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderSummary ? summary : details}
        </Box>
        <Box
          sx={{
            maxWidth: "250px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            marginTop: "200px",
          }}
        >
          {isCopied ? <Alert>Copied to clipboard!</Alert> : null}
        </Box>
      </Card>
    </div>
  );
};

export default AccountDetails;
