import React from "react";
import { styled } from "@mui/material/styles";
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

interface DataTableProps {
    dataComponent?: React.ReactNode;
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.common.white,
      fontSize: "17px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "12px",
      paddingTop: "10px",
      paddingBottom: "10px",
      
    },
  }));
  
  export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.paper
    },
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const DataTable: React.FC<DataTableProps> = ({ dataComponent }) => {

    return (
        <TableContainer>
            { dataComponent }
        </TableContainer>
    )
  }

  export default DataTable;