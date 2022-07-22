import { NextPage } from "next";
import { useRouter } from "next/router";
import Article from "components/article";
import { useFormatAddress } from "hooks/useFormatAddress";
import { firstOrValue } from "core/firstOrValue";
import { useArticleEvents } from "hooks/useArticleEvents";
import { constants } from "ethers";

const Author: NextPage = () => {
  const router = useRouter();
  const { id: minterAddress } = router.query;
  const formattedMinterName = firstOrValue(
    minterAddress || constants.AddressZero
  );
  const minterName = useFormatAddress({
    address: formattedMinterName,
    truncate: true,
  });

  const articles = useArticleEvents(formattedMinterName);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base md:text-2xl lg:text-3xl font-bold">
        {minterName}
      </h2>
      {articles.length === 0 ? (
        <div>No artices found for this author.</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {articles
            .sort((a, b) => b.block - a.block)
            .map(({ minter, tokenId, cid, block }) => (
              <Article
                key={tokenId}
                minter={minter}
                tokenId={tokenId}
                cid={cid}
                block={block}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default Author;
