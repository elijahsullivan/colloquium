import { useNetwork } from "wagmi";
import { formatAddress as format } from "core/formatAddress";
import { useFormatAddress } from "hooks/useFormatAddress";
import { COLLOQUIUM_ADDRESS } from "core/constants";

interface DetailsProps {
  cid: string;
  tokenOwner: string | undefined;
  tokenId: string;
  isError: boolean;
}

export const Details = ({
  cid,
  tokenOwner,
  tokenId,
  isError,
}: DetailsProps) => {
  const { chain } = useNetwork();
  const tokenOwnerName = useFormatAddress({ address: tokenOwner });

  return (
    <>
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
          href={`${chain?.blockExplorers?.default.url}/token/${COLLOQUIUM_ADDRESS}?a=${tokenId}`}
        >
          {format(tokenId)}
        </a>
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
    </>
  );
};
