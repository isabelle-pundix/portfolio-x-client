import { useEffect, useState } from 'react';
import { useAppSelector } from '../state/ReduxHooks';
import { TokenBalances, TokenBalancesWithValue } from '../state/walletBalance/walletBalanceSlice';

export const useWalletData = (): TokenBalancesWithValue[] | null => {
  const userWalletBalances = useAppSelector((state) => state.walletBalances.tokenBalances);
  const prices = useAppSelector((state) => state.prices.tokenPrices);
  const [walletValue, setWalletValue] = useState<TokenBalancesWithValue[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userWalletBalances) {
        let updatedBalances = userWalletBalances
          .map((tokenBalance: TokenBalances) => {
            const priceObj = prices?.find((price) => price.symbol === tokenBalance.tokenSymbol);
            const tokenPrice = priceObj ? priceObj.priceUSD : 0;

            if (tokenBalance.tokenBalance === 0) {
              return undefined;
            }

            return {
              tokenSymbol: tokenBalance.tokenSymbol,
              tokenBalance: tokenBalance.tokenBalance,
              tokenValue: tokenPrice * tokenBalance.tokenBalance,
            };
          })
          .filter((balance) => balance !== undefined) as TokenBalancesWithValue[];

        setWalletValue(updatedBalances);
      }
    };

    fetchData();
  }, [userWalletBalances, prices]);

  return walletValue;
};
