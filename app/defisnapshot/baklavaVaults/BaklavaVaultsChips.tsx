import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Constants } from "@/app/constants";
import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import { Menu, MenuItem } from "@mui/material";

interface ChipData {
  key: number;
  label: string;
  isDeleted: boolean;
}

const chipCategories: ChipData[] = Constants.BaklavaVaultSnapshot.BaklavaVaultsCategories.map(
  (label, index) => ({
    key: index,
    label,
    isDeleted: false,
  })
);

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface ChipsArrayProps {
  onActiveIndexesChange: (activeIndexes: number[]) => void;
}

export default function ChipsArray({ onActiveIndexesChange }: ChipsArrayProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [chipData, setChipData] =
  React.useState<readonly ChipData[]>(chipCategories);
  const [activeIndexes, setActiveIndexes] = React.useState<number[]>([]);

  const handleClick = (chipIndex: number) => () => {
    const updatedChipData = [...chipData];
    updatedChipData[chipIndex].isDeleted =
      !updatedChipData[chipIndex].isDeleted;
    setChipData(updatedChipData);

    const newActiveIndexes = updatedChipData
      .filter((data) => !data.isDeleted)
      .map((data) => data.key);

    if (newActiveIndexes.length > 0) {
      setActiveIndexes(newActiveIndexes);
      onActiveIndexesChange(newActiveIndexes);
    } else {
      const updatedChipData = [...chipData];
      updatedChipData[0].isDeleted = false;
      setChipData(updatedChipData);
      setActiveIndexes([0]);
      onActiveIndexesChange([0]);
    }
  };

  //For handling chips in mobile view
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
      setAnchorEl(null);
  };

  return (
    <Box>
      {isMobile ? (
        <Box sx={{ textAlign: 'right', paddingRight: theme.spacing(2) }}>
          <Button
            aria-controls={"chips-menu"}
            aria-haspopup={"true"}
            onClick={handleMenuClick}
          >
            Filter
          </Button>
          <Menu
            id={"chips-menu"}
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleMenuClose}
          >
            {chipData.map((data, index) => (
              <MenuItem
                key={data.key}
                selected={activeIndexes.indexOf(data.key) > -1}
                onClick={handleClick(index)}
              >
                <Typography variant="h6" sx={{ fontSize: "10px" }}>
                  {data.label}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : (
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: isMobile ? "wrap" : "nowrap",
            listStyle: "none",
            margin: 0,
            padding: isMobile? 1 : 0,
            borderRadius: 0,
          }}
        >
          {chipData.map((data, index) => {
            let icon;

            if (data.isDeleted) {
              icon = <AddIcon style={{color: "rgba(255, 255, 255, 0.85)"}} />;
            } else {
              icon = <ClearIcon style={{color: "rgba(255, 255, 255, 0.85)"}} />;
            }

            const defaultChipStyle = {
              backgroundColor: "#616161"
            };

            const deletedChipStyle = {
              backgroundColor: Constants.BaklavaVaultSnapshot.BaklavaVaultsCategoriesColors[index],
            };

            const chipStyle = data.isDeleted
              ? deletedChipStyle
              : defaultChipStyle;

            return (
              <ListItem key={data.key}>
                <Chip
                  icon={icon}
                  label={(
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "10px" }}
                    >
                      {data.label}
                    </Typography>
                  )}
                  onClick={handleClick(index)}
                  sx={{ fontSize: "10px" }}
                  style={chipStyle}
                />
              </ListItem>
            );
          })}
        </ul>
      )}
    </Box>
  );
}
