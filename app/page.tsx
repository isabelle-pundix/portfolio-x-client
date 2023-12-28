"use client";

import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "./state/ReduxHooks";
import { retrieveLiquidityPosMeta } from "./utils/Liquidity";
import { retrieveFarmPosMeta } from "./utils/Farm";
import { selectUser } from "./state/user/userSlice";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const user = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (user._id === null) {
      router.push("/defisnapshot");
    } else {
      router.push("/assetdashboard");
    }
  }, [user._id, router])

  return null;

  
}

export default Home;
