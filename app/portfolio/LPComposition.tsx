import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

interface LPCompo {
    token0PooledAmount: string;
    token0Src: string | undefined;
    token1PooledAmount: string;
    token1Src: string | undefined;
}

const LPComposition: React.FC<LPCompo> = ({
    token0PooledAmount,
    token0Src,
    token1PooledAmount,
    token1Src
}) => {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                position: "relative",
                alignItems: "center"
            }}
        >
            <Typography variant="subtitle1" sx={{ fontWeight: "250" }}>
                {token0PooledAmount}
            </Typography>
            {(token0Src) ?
                <Box
                    component="img"
                    sx={{
                        height: "18px",
                        marginLeft: "2px"
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
            <Typography variant="subtitle1" sx={{ fontWeight: "250", paddingInline: "5px" }}>
                {"+"}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "250" }}>
                {token1PooledAmount}
            </Typography>
            {(token1Src) ?
                <Box
                    component="img"
                    sx={{
                        height: "18px",
                        marginLeft: "2px"
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

export default LPComposition;