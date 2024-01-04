"use client";

import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Constants } from "../../constants";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [Constants.Chain.FXCORE],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Portfolio X",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "600d06ae563150362f350a45a4b0fa94",
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export function Web3Modal({ children }: any) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}
