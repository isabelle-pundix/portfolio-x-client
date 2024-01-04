import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";

export interface LongMenuProps {
    sendSelectionLabel: (label: string) => void;
}

export default function LongMenu({sendSelectionLabel}: LongMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [currentSelection, setCurrentSelection] = useState('');

  useEffect(() => {
    sendSelectionLabel(currentSelection)
  }, [currentSelection])

  const handleClickDetails = (event: React.MouseEvent<HTMLElement>, selectionLabel: string) => {
    setAnchorEl(event.currentTarget);
    // const selectionLabel = event.currentTarget?.textContent || '';
    setCurrentSelection(selectionLabel);
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{color: "white"}}/>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={(event) => handleClickDetails(event, 'Details')}>
          <InfoIcon style={{ marginRight: "10px" }} />
          Wallet details
        </MenuItem>
        <MenuItem onClick={(event) => handleClickDetails(event, 'Delete')}>
          <DeleteIcon style={{ marginRight: "10px" }} />
          Remove wallet
        </MenuItem>
      </Menu>
      
    </div>
  );
}
