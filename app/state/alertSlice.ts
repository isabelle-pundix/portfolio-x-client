import { createSlice } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material"
import { addNote, deleteNote } from "./privateNote/privateNoteSlice";
import { editUserInfo } from "./user/userSlice";
import { addWalletAddress, deleteWalletAddress, editWalletAddress } from "./walletAddress/walletAddressSlice";

export interface AlertState {
    alert: boolean
    title?: string
    severity?: AlertColor | undefined
    message?: string
}

const initialState: AlertState = {
    alert: false,
    severity: 'info'
}

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        closeAlert(state, action){
            state.alert = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNote.fulfilled, (state,action)=>{
                state.alert = true
                state.title = 'Note Added'
                state.severity = 'success'
            })
            .addCase(deleteNote.fulfilled, (state,action)=>{
                state.alert = true
                state.title = 'Note Deleted'
                state.severity = 'success'
            })
            .addCase(editUserInfo.rejected, (state,action)=>{
                state.alert = true
                state.title = `${action.payload?.message}`
                state.severity = 'error'
            })
            .addCase(addWalletAddress.fulfilled, (state, action) => {
                state.alert = true
                state.title = "Wallet Address Added"
                state.severity = 'success'
            })
            .addCase(addWalletAddress.rejected, (state, action) => {
                state.alert = true
                state.title = `${action.payload?.message}`
                state.severity = 'error'
            })
            .addCase(editWalletAddress.rejected, (state,action)=>{
                state.alert = true
                state.title = `${action.payload?.message}`
                state.severity = 'error'
            })
            .addCase(deleteWalletAddress.fulfilled, (state,action)=>{
                state.alert = true
                state.title = 'Wallet Address Deleted'
                state.severity = 'success'
            })

    }
});

export const { closeAlert } = alertSlice.actions

export default alertSlice.reducer;