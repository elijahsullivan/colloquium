import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";

export const ConnectButton = () => {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="flex items-center font-medium bg-purple-100 px-2 py-1 rounded"
                  >
                    Connect
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center bg-red-100 px-2 py-1 rounded"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center font-medium bg-purple-100 px-2 py-1 rounded-l border-r border-purple-200"
                  >
                    {chain.name}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="bg-purple-100 font-medium px-2 py-1 rounded-r"
                  >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};
