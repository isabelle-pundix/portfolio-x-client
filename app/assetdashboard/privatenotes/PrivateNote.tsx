import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  Divider,
  Modal,
  TextField,
  IconButton,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Pagination,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/state/ReduxHooks";
import {
  addNote,
  deleteNote,
  editNote,
  selectAllPrivateNotes,
  selectPrivateNoteById,
  selectPrivateNoteIds,
} from "@/app/state/privateNote/privateNoteSlice";
import { EntityId } from "@reduxjs/toolkit";
import { Edit, Delete, NoteAdd } from "@mui/icons-material";
import AlertComp from "./Alert/Alert";
import { fetchAndUpdateUser, selectUser } from "@/app/state/user/userSlice";
import { store } from "@/app/state/store";
import { useTheme } from "@mui/material/styles";

interface PrivateNoteExcerptProps {
  index: number;
  privateNoteId: EntityId;
  setEditId: React.Dispatch<React.SetStateAction<EntityId | null>>;
  setNoteInput: React.Dispatch<React.SetStateAction<string>>;
  handleOpen: () => void;
}

const PrivateNoteExcerpt: React.FC<PrivateNoteExcerptProps> = React.memo(
  ({ privateNoteId, setEditId, setNoteInput, handleOpen, index }) => {
    const number = index + 1;
    const privateNote = useAppSelector((state) =>
      selectPrivateNoteById(state, privateNoteId)
    );
    const dispatch = useAppDispatch();

    const handleEdit = (privateNoteId: EntityId) => {
      setEditId(privateNoteId);
      if (privateNote && privateNote.content) {
        setNoteInput(privateNote.content);
      }
      handleOpen();
    };
    const theme = useTheme();

    //confirm modal to confirm delete
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleOpenConfirm = () => setOpenConfirm(true);
    const handleCloseConfirm = () => setOpenConfirm(false);

    const handleDelete = () => {
      dispatch(deleteNote(privateNoteId));
    };

    return privateNote ? (
      <>
        <Modal
          open={openConfirm}
          onClose={handleCloseConfirm}
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
              onClick={handleDelete}
              sx={{ backgroundColor: theme.palette.primary.dark }}
            >
              Confirm Delete
            </Button>
          </Box>
        </Modal>
        <Grid item xs={9} sx={{ overflowWrap: "break-word" }}>
          {`${number}. ${privateNote.content}`}
        </Grid>
        <Grid item xs={3} display="flex" justifyContent="flex-end">
          <IconButton
            sx={{ color: "white" }}
            onClick={() => handleEdit(privateNoteId)}
          >
            <Edit />
          </IconButton>
          <IconButton
            sx={{ marginLeft: "18px", color: "white" }}
            onClick={handleOpenConfirm}
          >
            <Delete />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </>
    ) : null;
  }
);

const PrivateNoteList: React.FC = () => {
  const privateNoteIds = useAppSelector(selectPrivateNoteIds);
  const state = store.getState();
  const user = useAppSelector(selectUser);
  const notes = state.privateNotes;
  const dispatch = useAppDispatch();
  const theme = useTheme();

  //input modal and state for add/edit
  const [open, setOpen] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [editId, setEditId] = useState<EntityId | null>(null);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = () => setOpen(false);

  const handleSaveNote = async() => {
    if (editId !== null) {
      await dispatch(editNote({ id: editId, content: noteInput }));
    } else {
      await dispatch(addNote(noteInput));
    }
    await dispatch(fetchAndUpdateUser());
    setNoteInput("");
    setEditId(null);
    handleClose();
  };

  //pagination
  const [page, setPage] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const rowsPerPage = 5;
  let numberOfPages = Math.ceil(privateNoteIds.length / rowsPerPage);
  let emptyRows = 0;
  if (numberOfPages > 1)
    emptyRows = numberOfPages * rowsPerPage - privateNoteIds.length;
  let filler = (
    <>
      {Array(emptyRows)
        .fill(null)
        .map((row, index) => (
          <Grid key={index} height={55.28} xs={12} item></Grid>
        ))}
    </>
  );

  useEffect(() => {
    //to render the list properly when deleting last item in the last page
    if (page !== 1 && page > numberOfPages) setPage(numberOfPages);
  }, [numberOfPages]);

  return (
    <Box>
      <AlertComp />
      <Modal
        open={open}
        onClose={handleClose}
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
            label="Private Note"
            variant="outlined"
            fullWidth
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            sx={{ display: "block" }}
          />
          <Button
            variant="contained"
            onClick={handleSaveNote}
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
      <Card sx={{ backgroundColor: "rgb(26,26,26)" }}>
        <CardContent>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            alignItems="center"
          >
            <Grid item xs={9}>
              <Typography variant="h5">Notes</Typography>
            </Grid>
            <Grid item xs={3} display="flex" justifyContent="flex-end">
              <IconButton sx={{ color: "white" }} onClick={handleOpen}>
                <NoteAdd />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {privateNoteIds.length > 0 && (
              <>
                {privateNoteIds.map((privateNoteId, index) => {
                  if (index >= page * rowsPerPage) return null;
                  if (index < page * rowsPerPage - rowsPerPage) return null;
                  return (
                    <PrivateNoteExcerpt
                      index={index}
                      key={privateNoteId}
                      privateNoteId={privateNoteId}
                      setEditId={setEditId}
                      setNoteInput={setNoteInput}
                      handleOpen={handleOpen}
                    />
                  );
                })}
                {page === numberOfPages && emptyRows > 0 && filler}
              </>
            )}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "1rem",
              }}
            >
              <Pagination
                count={numberOfPages}
                shape="rounded"
                page={page}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PrivateNoteList;
