import { useNetwork } from "wagmi";
import { mainnet, localhost } from "wagmi/chains";

export const useChain = () => {
  const { chain } = useNetwork();
  const chainIdOrFallback = !chain ? mainnet.id : chain.id;
  const chainId =
    chainIdOrFallback === localhost.id ? 31337 : chainIdOrFallback;

  return chainId;
};
