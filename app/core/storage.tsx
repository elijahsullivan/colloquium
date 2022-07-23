import { createContext, PropsWithChildren, useContext } from "react";
import { Web3Storage } from "web3.storage";
import { QueryClient, QueryClientProvider } from "react-query";

export const createStorageClient = ({ token = "" }: StorageClientOptions) =>
  new Web3Storage({
    token,
    endpoint: new URL("https://api.web3.storage"),
  });

const StorageContext = createContext<Web3Storage | undefined>(undefined);

const queryClient = new QueryClient();

export const Web3StorageProvider = ({
  client,
  children,
}: PropsWithChildren<Web3StorageProviderProps>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StorageContext.Provider value={client}>
        {children}
      </StorageContext.Provider>
    </QueryClientProvider>
  );
};

export const useStorageClient = () => useContext(StorageContext);

interface StorageClientOptions {
  token: string | undefined;
}

interface Web3StorageProviderProps {
  client: Web3Storage;
}
