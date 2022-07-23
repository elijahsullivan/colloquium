import React from "react";
import type { NextPage } from "next";
import Article from "components/article";
import { useArticleEvents } from "hooks/useArticleEvents";
import { useOwners } from "hooks/useOwners";
import { useFormatAddress } from "hooks/useFormatAddress";
import Link from "next/link";
import { useChain } from "hooks/useChain";

interface OwnerProps {
  address: string;
  balance: number;
}

const Owner = ({ address, balance }: OwnerProps) => {
  const username = useFormatAddress({ address });

  return (
    <li>
      <Link href={`/author/${address}`}>
        <a className="underline">{username}</a>
      </Link>{" "}
      owns {balance} articles.
    </li>
  );
};

const Articles = () => {
  const articles = useArticleEvents();

  if (articles.length === 0) return <div>No articles found.</div>;
  return (
    <ul className="flex flex-col gap-6">
      {articles
        .sort((a, b) => b.block - a.block)
        .map(({ cid, minter, tokenId, block }) => (
          <Article
            key={tokenId}
            minter={minter}
            tokenId={tokenId}
            cid={cid}
            block={block}
          />
        ))}
    </ul>
  );
};

const Owners = () => {
  const chainId = useChain();
  const { data: owners, isLoading, isError } = useOwners({ chainId });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading articles</div>;
  if (owners?.data?.items.length === 0)
    return <div>No article owners found.</div>;
  return (
    <ul className="flex flex-col gap-2">
      {owners?.data?.items.map(
        (author: { address: string; balance: number }) => (
          <Owner
            key={author.address}
            address={author.address}
            balance={author.balance}
          />
        )
      )}
    </ul>
  );
};

const Read: NextPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Recent Articles</h2>
        <Articles />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Top Article Owners</h2>
        <Owners />
      </div>
    </div>
  );
};

export default Read;
