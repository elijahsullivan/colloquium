import { utils, BigNumber } from "ethers";

// This uses the same process of encoding/hashing the CID
// as the colloquium smart contract
export const generateTokenId = (cid: string) =>
  BigNumber.from(
    utils.keccak256(utils.defaultAbiCoder.encode(["string"], [cid]))
  ).toString();
