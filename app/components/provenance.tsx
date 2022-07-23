import Link from "next/link";
import { useFormatAddress } from "hooks/useFormatAddress";
import { constants } from "ethers";
import { useProvenance } from "hooks/useProvenance";
import { useChain } from "hooks/useChain";

const TransactionPair = ({ from, to }: { from: string; to: string }) => {
  const fromName = useFormatAddress({ address: from });
  const toName = useFormatAddress({ address: to });

  return (
    <li>
      <Link href={`/author/${from}`}>
        <a className="underline">{fromName}</a>
      </Link>{" "}
      &rarr;{" "}
      <Link href={`/author/${to}`}>
        <a className="underline">{toName}</a>
      </Link>
    </li>
  );
};

interface ProvenanceProps {
  tokenId: string;
  tokenOwner: string | undefined;
}

export const Provenance = ({ tokenId, tokenOwner }: ProvenanceProps) => {
  const chainId = useChain();
  const { data: provenance } = useProvenance({
    chainId,
    tokenId,
  });

  const provenanceList = provenance?.data?.items[0].nft_transactions
    .reduce(
      (
        acc: string[],
        curr: { successful: boolean; from_address: string },
        index: number
      ) =>
        !curr.successful || index === 0 ? acc : [...acc, curr.from_address],
      [constants.AddressZero]
    )
    .concat(tokenOwner);

  const transactionPairs = provenanceList?.reduce(
    (
      acc: { from: string; to: string }[],
      curr: string,
      index: number,
      arr: string[]
    ) =>
      index + 1 >= arr.length
        ? acc
        : [...acc, { from: curr, to: arr[index + 1] }],
    []
  );

  return (
    <ul>
      {transactionPairs
        ?.reverse()
        .map(({ from, to }: { from: string; to: string }, index: number) => (
          <TransactionPair key={index} from={from} to={to} />
        ))}
    </ul>
  );
};
