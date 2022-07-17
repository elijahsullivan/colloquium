import { NextPage } from "next";
import { useRouter } from "next/router";
import { useStorageReadJSON } from "core/storage";
import Link from "next/link";
import { utils, BigNumber } from "ethers";
import { erc721ABI, useContractRead, useNetwork } from "wagmi";
import { COLLOQUIUM_ADDRESS } from "core/constants";
import { useFormatAddress } from "hooks/useFormatAddress";
import { useAuthor } from "hooks/useAuthor";
import { firstOrValue } from "core/firstOrValue";
import { formatAddress as format } from "core/formatAddress";

// This uses the same process of encoding/hashing the CID
// as the colloquium smart contract
const generateTokenId = (cid: string) =>
  BigNumber.from(
    utils.keccak256(utils.defaultAbiCoder.encode(["string"], [cid]))
  ).toString();

const Content = ({ cid }: { cid: string }) => {
  const { data, isLoading } = useStorageReadJSON(cid);
  const { chain } = useNetwork();
  const tokenId = generateTokenId(cid);
  const author = useAuthor(tokenId);
  const authorName = useFormatAddress({ address: author });

  const { data: tokenOwner, isError } = useContractRead({
    addressOrName: COLLOQUIUM_ADDRESS,
    contractInterface: erc721ABI,
    functionName: "ownerOf",
    args: [tokenId],
  }) as { data: string | undefined; isError: boolean }; // better way to do this?

  const tokenOwnerName = useFormatAddress({ address: tokenOwner });

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
          <p className="text-xl font-medium leading-loose font-serif">
            {data.body}
          </p>
        </div>
      )}
      <section className="bg-purple-50 p-4 mt-10 rounded">
        <div>
          CID:{" "}
          <a
            className="underline"
            href={`https://ipfs.io/ipfs/${cid}/colloquium.json`}
          >
            {format(cid)}
          </a>
        </div>
        <div>
          Token ID:{" "}
          <a
            className="underline"
            href={`${chain?.blockExplorers?.default.url}/token/${tokenId}`}
          >
            {format(tokenId)}
          </a>
        </div>
        <div>
          Author:{" "}
          {author ? (
            <Link href={`/author/${author}`}>
              <a className="underline">{authorName}</a>
            </Link>
          ) : (
            <span>Not Found</span>
          )}
        </div>
        <div>
          {isError ? (
            <div>Ownership not claimed</div>
          ) : (
            <div>
              Token Owner:{" "}
              <a
                className="underline"
                href={`${chain?.blockExplorers?.default.url}/address/${tokenOwner}`}
              >
                {tokenOwnerName}
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const Article: NextPage = () => {
  const router = useRouter();
  const { cid } = router.query;

  return cid ? <Content cid={firstOrValue(cid)} /> : <></>;
};

export default Article;
