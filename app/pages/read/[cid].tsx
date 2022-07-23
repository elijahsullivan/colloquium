import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useStorageRead } from "hooks/useStorageRead";
import { erc721ABI, useContractRead } from "wagmi";
import { COLLOQUIUM_ADDRESS } from "core/constants";
import { useFormatAddress } from "hooks/useFormatAddress";
import { useAuthorEvent } from "hooks/useAuthorEvent";
import { firstOrValue } from "core/firstOrValue";
import { generateTokenId } from "core/generateTokenId";
import { Tip } from "components/tip";
import { Provenance } from "components/provenance";
import { Details } from "components/details";

const Content = ({ cid }: { cid: string }) => {
  const { data, isLoading } = useStorageRead(cid);
  const tokenId = generateTokenId(cid);
  const author = useAuthorEvent(tokenId);
  const authorName = useFormatAddress({ address: author });

  const { data: tokenOwner, isError } = useContractRead({
    addressOrName: COLLOQUIUM_ADDRESS,
    contractInterface: erc721ABI,
    functionName: "ownerOf",
    args: [tokenId],
  }) as { data: string | undefined; isError: boolean };

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div className="flex flex-col gap-4">
          <section>
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <section className="flex gap-1">
              <span>By </span>
              <h2>
                {author ? (
                  <Link href={`/author/${author}`}>
                    <a className="underline">{authorName}</a>
                  </Link>
                ) : (
                  "Anonymous"
                )}
              </h2>
            </section>
          </section>
          <p className="text-xl font-medium leading-relaxed font-serif">
            {data.body}
          </p>
          {tokenOwner && <Tip address={tokenOwner} />}
        </div>
      )}
      <section className="bg-purple-50 p-4 mt-10 rounded flex flex-col gap-2">
        <section>
          <h3 className="font-semibold">Details</h3>
          <Details
            cid={cid}
            tokenId={tokenId}
            tokenOwner={tokenOwner}
            isError={isError}
          />
        </section>
        <section>
          <h3 className="font-semibold">Provenance</h3>
          <Provenance tokenId={tokenId} tokenOwner={tokenOwner} />
        </section>
      </section>
    </>
  );
};

const Article: NextPage = () => {
  const router = useRouter();
  const { cid } = router.query;

  if (!cid) return <></>;
  return <Content cid={firstOrValue(cid)} />;
};

export default Article;
