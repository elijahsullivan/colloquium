import { COLLOQUIUM_ADDRESS } from "core/constants";

const ROOT_URL = "https://api.covalenthq.com/v1";
const username = process.env.NEXT_PUBLIC_COVALENT_USERNAME;

const headers = {
  Authorization: `Basic ${btoa(`${username}:`)}`,
  "Content-Type": "application/json",
};

export const fetchProvenance =
  (chainId: number, tokenId: string) => async () => {
    const res = await fetch(
      `${ROOT_URL}/${chainId}/tokens/${COLLOQUIUM_ADDRESS}/nft_transactions/${tokenId}/`,
      { headers }
    );
    return res.json();
  };

export const fetchOwners = (chainId: number) => async () => {
  const res = await fetch(
    `${ROOT_URL}/${chainId}/tokens/${COLLOQUIUM_ADDRESS}/token_holders/`,
    { headers }
  );
  return res.json();
};
