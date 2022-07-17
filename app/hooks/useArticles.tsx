import { COLLOQUIUM_ADDRESS } from "core/constants";
import { useState } from "react";
import { Events } from "types/contract";
import { useContractEvent } from "wagmi";
import contract from "../../out/Author.sol/Author.json";

export const useArticles = () => {
  const [articles, setArticles] = useState<
    {
      minter: string;
      tokenId: string;
      cid: string;
    }[]
  >([]);
  useContractEvent({
    addressOrName: COLLOQUIUM_ADDRESS,
    contractInterface: contract.abi,
    eventName: Events.MINT,
    chainId: 31337, // FIX THIS
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
