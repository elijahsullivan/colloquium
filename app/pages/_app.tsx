import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import type { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Web3StorageProvider, createStorageClient } from "core/storage";
import Layout from "components/layout";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.localhost, chain.mainnet, chain.polygon],
  [
    alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "colloquium",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const storageClient = createStorageClient({
  token: process.env.NEXT_PUBLIC_STORAGE_TOKEN,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Web3StorageProvider client={storageClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3StorageProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
