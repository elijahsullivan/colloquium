import { useEffect, useState } from "react";
import { utils, Event } from "ethers";
import { useWebSocketProvider, useContract } from "wagmi";
import { COLLOQUIUM_ADDRESS, DEPLOYMENT_BLOCK } from "core/constants";
import contract from "core/Colloquium.json";

export const useAuthorEvent = (tokenId: string) => {
  const [author, setAuthor] = useState("");
  const webSocketProvider = useWebSocketProvider();

  const colloquium = useContract({
    addressOrName: COLLOQUIUM_ADDRESS,
    contractInterface: contract.abi,
    signerOrProvider: webSocketProvider,
  });

  useEffect(() => {
    const iface = new utils.Interface(contract.abi);

    colloquium
      .queryFilter(
        colloquium.filters.Mint(null, tokenId, null, null),
        DEPLOYMENT_BLOCK
      )
      .then((eventList: Event[]) => {
        const authors = eventList.map((event) => {
          const [minter] = iface.parseLog(event).args;
          return minter;
        });
        setAuthor(authors[0]);
      });
  }, []);

  return author;
};
