import React from "react";
import type { NextPage } from "next";
import Article from "components/article";
import { useArticleEvents } from "hooks/useArticleEvents";

const Read: NextPage = () => {
  const articles = useArticleEvents();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Recent Articles</h2>
      {articles.length === 0 ? (
        <div>No articles found.</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {articles.map(({ cid, minter, tokenId }) => (
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

export default Read;
