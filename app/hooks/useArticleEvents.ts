import { useEffect, useState } from "react";
import { utils, Event } from "ethers";
import { useWebSocketProvider, useContract } from "wagmi";
import { COLLOQUIUM_ADDRESS, DEPLOYMENT_BLOCK } from "core/constants";
import contract from "core/Colloquium.json";
import { Article } from "core/types/articles";

export const useArticleEvents = (minter?: string) => {
  const [articles, setArticles] = useState<Article[]>([]);
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
        colloquium.filters.Mint(minter, null, null, null),
        DEPLOYMENT_BLOCK
      )
      .then((eventList: Event[]) => {
        const article = eventList.map((event) => {
          const [minter, tokenId, _, contentId] = iface.parseLog(event).args;
          return {
            minter: minter.toString(),
            tokenId: tokenId.toString(),
            cid: contentId,
            block: event.blockNumber,
          };
        });
        setArticles([...articles, ...article]);
      });
  }, [minter]);

  return articles;
};
