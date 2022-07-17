import { createContext, PropsWithChildren, useContext } from "react";
import { Web3Storage } from "web3.storage";
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "react-query";

function makeFileObjects(data: string) {
  return [new File([data], "colloquium.json")];
}

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

export const useStorageWrite = () => {
  const client = useStorageClient();

  const { mutate, mutateAsync, ...rest } = useMutation((content: string) => {
    const files = makeFileObjects(content);
    return client!.put(files);
  });

  return { write: mutate, writeAsync: mutateAsync, ...rest };
};

const read = (client: Web3Storage | undefined, cid: string) => {
  return client!.get(cid);
};

export const useStorageReadJSON = (cid: string) => {
  const client = useStorageClient();

  const response = useQuery(cid, async () => {
    const res = await read(client, cid);
    if (!res || res.ok === false) return Promise.reject();
    const files = await res.files();

    const text = await files[0].text();

    try {
      return JSON.parse(text);
    } catch (error) {
      return Promise.reject(error);
    }
  });

  return response;
};

interface StorageClientOptions {
  token: string | undefined;
}

interface Web3StorageProviderProps {
  client: Web3Storage;
}
