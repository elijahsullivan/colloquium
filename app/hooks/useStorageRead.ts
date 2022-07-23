import { useQuery } from "react-query";
import { Web3Storage } from "web3.storage";
import { useStorageClient } from "core/storage";

const read = (client: Web3Storage | undefined, cid: string) => {
  return client!.get(cid);
};

export const useStorageRead = (cid: string) => {
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
