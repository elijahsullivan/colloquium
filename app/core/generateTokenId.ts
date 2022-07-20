import { utils, BigNumber } from "ethers";

export const generateTokenId = (cid: string) =>
  BigNumber.from(
    utils.keccak256(utils.defaultAbiCoder.encode(["string"], [cid]))
  ).toString();
