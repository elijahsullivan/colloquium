import { useQuery } from "react-query";
import { fetchProvenance } from "core/data";

export const useProvenance = ({
  chainId,
  tokenId,
}: {
  chainId: number;
  tokenId: string;
}) => useQuery(["provenance", tokenId], fetchProvenance(chainId, tokenId));
