# Colloquium

A marketplace for ideas.

## About

Colloquium provides on-chain proof of content authorship and ownership.

## Technical Details

The `generateTokenId` function found here `app/core/generateTokenId.ts` uses
the same process of encoding/hashing the CID as the colloquium smart contract.
This allows the frontend to determine if any content addressable data has an
associated NFT.

## Technology

- [foundry](https://github.com/foundry-rs/foundry)
- [next.js](https://github.com/vercel/next.js)
- [web3.storage](https://github.com/web3-storage/web3.storage)
- [wagmi](https://github.com/tmm/wagmi)
- [rainbowkit](https://github.com/rainbow-me/rainbowkit)
- [react-query](https://github.com/TanStack/query)
