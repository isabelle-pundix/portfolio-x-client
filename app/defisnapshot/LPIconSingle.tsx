import React from "react";
import Box from "@mui/material/Box";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

interface SingleURL {
    token0Src: string | undefined;
    children?: React.ReactNode;
}

const LPIconSingle: React.FC<SingleURL> = ({ token0Src }) => {

    return (
        <Box
            sx={{
                display: "flex",
                position: "relative",
                alignItems: "center"
            }}
        >
            <Box sx={{ height: "24px", width: "24px",flexShrink: 0, marginLeft: "0px" }}/>
            {(token0Src) ?
                <Box
                    component="img"
                    sx={{
                        height: "24px",
                        width: "24px",
                        flexShrink: 0,
                        marginLeft: "-8px",
                        marginRight: "10px"
                    }}
                    src={token0Src}
                /> :
                <MonetizationOnIcon
                    sx={{
                        padding: "1px",
                        marginRight: "10px",
                        height: "18px",
                        width: "18px"
                    }}
                />
            }
        </Box>
    )
}

export default LPIconSingle;