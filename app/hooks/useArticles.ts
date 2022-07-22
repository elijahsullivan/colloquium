import { COLLOQUIUM_ADDRESS } from "core/constants";
import { useState } from "react";
import { Events } from "types/contract";
import { useContractEvent } from "wagmi";
import contract from "core/Colloquium.json";
import { useChain } from "./useChain";

export const useArticles = () => {
  const [articles, setArticles] = useState<
    {
      minter: string;
      tokenId: string;
      cid: string;
    }[]
  >([]);
  const chainId = useChain();

  useContractEvent({
    addressOrName: COLLOQUIUM_ADDRESS,
    contractInterface: contract.abi,
    eventName: Events.MINT,
    chainId,
    listener: (event) => {
      const [minter, tokenId, _, contentId] = event;
      setArticles([
        ...articles,
        {
          minter: minter.toString(),
          tokenId: tokenId.toString(),
          cid: contentId,
        },
      ]);
    },
  });

  return articles;
};
