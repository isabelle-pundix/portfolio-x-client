"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../state/ReduxHooks";
import serveraxios from "../config/ServerAxios";
import { selectAuth, setAccessToken } from "../state/authSlice";
import { fetchAndUpdateUser } from "../state/user/userSlice";
import {
  fetchTokenBalances,
  selectWalletBalances,
} from "../state/walletBalance/walletBalanceSlice";
import { fetchPrices, selectPrices } from "../state/prices/pricesSlice";
import BlockUpdateListener from "./updater/BlockUpdateListener";

export default function ClientApplication({ children }: any) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const prices = useAppSelector(selectPrices);
  console.log("Prices", prices)
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

 useEffect(() => {
  const handleStorageChange = () => {
    const storedWalletAddress = localStorage.getItem("walletAddress");
    console.log("Local storage", storedWalletAddress);
    setWalletAddress(storedWalletAddress);
  };

  window.addEventListener("storage", handleStorageChange);

  const storedWalletAddress = localStorage.getItem("walletAddress");
  setWalletAddress(storedWalletAddress);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []); 

  // Access token
  const getAccessTokenAndRefreshToken = useCallback(async (): Promise<NodeJS.Timeout> => {
    try {
      const response = await serveraxios.post(
        `/api/refreshToken`,
        undefined,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(setAccessToken(response.data.accessToken))
      }
    } catch (err) {
      console.error(err)
      dispatch(setAccessToken(null))
    }

    return setTimeout(getAccessTokenAndRefreshToken, 15 * 60 * 1000)

  }, [])

  useEffect(() => {
    const timeoutId = getAccessTokenAndRefreshToken()
    return () => {
      timeoutId as unknown as number
    }
  }, [setAccessToken])

  // User
  useEffect(() => {
    if (
      auth.accessToken !== null &&
      auth.accessToken !== "fetching" 
    ) {
      dispatch(fetchAndUpdateUser());
    }
  }, [auth.accessToken]);

  // Token balances & Prices
  useEffect(() => {
    dispatch(fetchTokenBalances());
    dispatch(fetchPrices());

    const intervalId = setInterval(() => {
      dispatch(fetchTokenBalances());
      dispatch(fetchPrices());
    }, 60000 * 30);

    return () => clearInterval(intervalId);
  }, [walletAddress]);

  return (
    <>
    <BlockUpdateListener />
    { children }
    </>
  );
}