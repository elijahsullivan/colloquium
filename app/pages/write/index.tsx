import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useStorageWrite } from "core/storage";
import Button from "components/button";
import useText from "hooks/useText";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { COLLOQUIUM_ADDRESS } from "core/constants";
import contract from "core/Colloquium.json";

interface ProgressBannerProps {
  data: string | undefined;
  mintTransactionData: { confirmations: number } | undefined;
  isLoading: boolean;
  isError: boolean;
}

const LoadingBanner = () => (
  <section className="bg-yellow-100 p-4 mb-2 rounded">
    <div>Loading...</div>
  </section>
);

const LoadedBanner = ({ cid }: { cid: string }) => (
  <section className="bg-green-100 p-4 mb-2 rounded">
    <div>
      Content Published!{" "}
      <Link href={`/read/${cid}`}>
        <a className="underline">Read Article</a>
      </Link>
    </div>
  </section>
);

const MintedBanner = ({ cid }: { cid: string }) => (
  <section className="bg-green-100 p-4 mb-2 rounded">
    <div>
      Content Minted:{" "}
      <Link href={`/read/${cid}`}>
        <a className="underline">Read Article</a>
      </Link>
    </div>
  </section>
);

const ErrorBanner = () => (
  <section className="bg-red-100 p-4 mb-2 rounded">
    Error: Already Minted
  </section>
);

const ProgressBanner = ({
  data,
  mintTransactionData,
  isLoading,
  isError,
}: ProgressBannerProps) => {
  if (isError) return <ErrorBanner />;
  if (isLoading) return <LoadingBanner />;
  if (mintTransactionData && data && mintTransactionData?.confirmations >= 1)
    return <MintedBanner cid={data} />;
  if (data) return <LoadedBanner cid={data} />;
  return null;
};

const Write: NextPage = () => {
  const { text: title, setText: setTitle, clearText: clearTitle } = useText("");
  const { text, setText, clearText } = useText("");
  const {
    data: cid,
    write,
    isLoading: isStorageWriteLoading,
  } = useStorageWrite();
  const { address } = useAccount();

  const {
    data: mintData,
    write: mint,
    isError: isMintError,
  } = useContractWrite({
    addressOrName: COLLOQUIUM_ADDRESS,
    contractInterface: contract.abi,
    functionName: "mint",
    args: [address, cid],
  });

  const { data: mintTransactionData, isLoading: isLoadingMint } =
    useWaitForTransaction({
      hash: mintData?.hash,
    });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(event.target.value);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const article = { title, body: text };
    write(JSON.stringify(article));
  };

  const handleClear = () => {
    clearText();
    clearTitle();
  };

  const handleMint = (event: React.MouseEvent) => {
    event.preventDefault();
    mint();
  };

  const isClearDisabled = text.length === 0 && title.length === 0;
  const isPublishDisabled = text.length === 0 || title.length === 0;
  const isMintDisabled = !(cid && address);

  return (
    <>
      <ProgressBanner
        data={cid}
        mintTransactionData={mintTransactionData}
        isLoading={isStorageWriteLoading || isLoadingMint}
        isError={isMintError}
      />
      <form onSubmit={handleSubmit} className="flex flex-col grow">
        <section className="flex justify-end gap-4 bg-slate-200 rounded p-4">
          <Button disabled={isClearDisabled} onClick={handleClear}>
            Discard
          </Button>
          <Button type="submit" disabled={isPublishDisabled}>
            Publish
          </Button>
          <Button disabled={isMintDisabled} onClick={handleMint}>
            Mint
          </Button>
        </section>
        <input
          className="text-3xl font-bold outline-none mt-4"
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          className="my-2 py-2 text-xl font-medium outline-none w-full grow font-serif leading-relaxed"
          placeholder="Tell the world what's on your mind..."
          value={text}
          onChange={handleChange}
        ></textarea>
      </form>
    </>
  );
};

export default Write;
