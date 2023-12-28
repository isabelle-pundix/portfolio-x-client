import React from "react";
import Box from "@mui/material/Box";
import FxSwapPoolGroup from "./FxSwapPoolGroup";
import FxSwapFarmGroup from "./FxSwapFarmGroup";
import Delegations from "../Delegations";

interface TableData {
    poolGroup: PoolGroup,
    farmGroup: FarmGroup,
    setDelTotal: React.Dispatch<React.SetStateAction<number>>,
}

const PortfolioData: React.FC<TableData> = ({ poolGroup, farmGroup, setDelTotal }) => {
    
    return (
        <Box>
            <FxSwapPoolGroup
                group={poolGroup.group}
                headings={poolGroup.headings}
                data={poolGroup.data}
            />
            <FxSwapFarmGroup
                group={farmGroup.group}
                headings={farmGroup.headings}
                data={farmGroup.data}
            />
            <Delegations
                setDelTotal={setDelTotal}
            />
        </Box >
    )
}

export default PortfolioData;