import { NextPage } from "next";
import { useRouter } from "next/router";
import Article from "components/article";
import { useFormatAddress } from "hooks/useFormatAddress";
import { firstOrValue } from "core/firstOrValue";
import { useArticles } from "hooks/useArticles";

const Author: NextPage = () => {
  const router = useRouter();
  const { id: minterAddress } = router.query;
  const minterName = useFormatAddress({
    address: firstOrValue(minterAddress || ""),
    truncate: true,
  });

  const articles = useArticles();
  const articlesByAuthor = articles.filter(
    ({ minter }) => minter === minterAddress
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base md:text-2xl lg:text-3xl font-bold">
        {minterName}
      </h2>
      {articlesByAuthor.length === 0 ? (
        <div>No artices found for this author.</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {articlesByAuthor.map(({ minter, tokenId, cid }) => (
            <Article
              key={tokenId}
              minter={minter}
              tokenId={tokenId}
              cid={cid}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Author;
