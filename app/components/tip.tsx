import { useSendTransaction } from "wagmi";
import { BigNumber, utils } from "ethers";

export const Tip = ({ address }: { address: string }) => {
  const TIP_AMOUNT = BigNumber.from("1000000000000000");
  const { isLoading, sendTransaction } = useSendTransaction({
    request: {
      to: address,
      value: TIP_AMOUNT,
    },
  });

  return (
    <button
      disabled={isLoading}
      onClick={() => sendTransaction()}
      className="font-medium rounded bg-green-100 px-3 py-1 self-start"
    >
      {`Tip ${utils.formatEther(TIP_AMOUNT)} ETH`}
    </button>
  );
};
