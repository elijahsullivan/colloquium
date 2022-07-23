import { useQuery } from "react-query";
import { fetchOwners } from "core/data";

export const useOwners = ({ chainId }: { chainId: number }) =>
  useQuery(["authors", chainId], fetchOwners(chainId));
