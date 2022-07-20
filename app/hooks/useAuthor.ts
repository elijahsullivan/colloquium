import { COLLOQUIUM_ADDRESS } from "core/constants";
import { useState } from "react";
import { Events } from "types/contract";
import { useContractEvent } from "wagmi";
import contract from "../../out/Author.sol/Author.json";
import { useChain } from "hooks/useChain";

export const useAuthor = (tokenId: string) => {
  const [author, setAuthor] = useState("");
  const chainId = useChain();

  // This should be optimized to use lower-level ethers library
  // to search on the indexed tokenId
  useContractEvent({
    addressOrName: COLLOQUIUM_ADDRESS,
    contractInterface: contract.abi,
    eventName: Events.MINT,
    chainId: chainId,
    listener: (event) => {
      const [minter, tokenId_] = event;
      if (tokenId_.toString() === tokenId) {
        setAuthor(minter.toString());
      }
    },
  });

  return author;
};