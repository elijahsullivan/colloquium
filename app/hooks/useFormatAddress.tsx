import { formatAddress } from "core/formatAddress";
import { useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";

interface Props {
  address: string | undefined;
  truncate?: boolean;
}

export const useFormatAddress = ({ address, truncate }: Props) => {
  const { data } = useEnsName({ address, chainId: mainnet.id });

  if (!address) return "";
  const formattedAddress = truncate ? address : formatAddress(address);
  return data || formattedAddress || "";
};
