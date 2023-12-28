import React from "react";
import Box from "@mui/material/Box";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

interface PairURL {
    token0Src: string | undefined;
    token1Src: string | undefined;
}

const LPIcon: React.FC<PairURL> = ({ token0Src, token1Src }) => {

    return (
        <Box
            sx={{
                display: "flex",
                position: "relative",
                alignItems: "center"
            }}
        >
            {(token0Src) ?
                <Box
                    component="img"
                    sx={{
                        height: "24px",
                        width: "24px",
                        flexShrink: 0,
                        marginLeft: "0px"
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
            {(token1Src) ?
                <Box
                    component="img"
                    sx={{
                        height: "24px",
                        width: "24px",
                        flexShrink: 0,
                        marginLeft: "-8px",
                        marginRight: "10px"
                    }}
                    src={token1Src}
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

export default LPIcon;