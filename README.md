# Colloquium ✍🏽

A marketplace for ideas.

## About 📝

Colloquium provides on-chain proof of content authorship and ownership.

## Technical Details 🤓

When a user drafts an article on colloquium and clicks "Publish" a
JSON string is created based on the provided title and body content:

```json
{
  "title": "HackFS 2022",
  "body": "Create the Foundation of the Decentralized Web!"
}
```

This JSON string representation of the article is then saved as a
single file titled "colloquium.json".

This file is then published to IPFS via [Web3.Storage](https://github.com/web3-storage/web3.storage).

The user then has the option to mint an NFT, proving authorship of the content.

When the user clicks "Mint", the content identifier (CID) of the published content
is sent to the colloquium smart contract. The CID is encoded and hashed (keccak256)
to generate the unique NFT token identifier.

This allows anyone with a CID to determine whether authorship has been claimed through
the colloquium smart contract.

## Technology 💾

- [polygon](https://polygon.technology/)
- [spheron](https://spheron.network/)
- [web3.storage](https://github.com/web3-storage/web3.storage)
- [alchemy](https://www.alchemy.com/)
- [wagmi](https://github.com/tmm/wagmi)
- [rainbowkit](https://github.com/rainbow-me/rainbowkit)
- [react-query](https://github.com/TanStack/query)
- [next.js](https://github.com/vercel/next.js)
- [foundry](https://github.com/foundry-rs/foundry)
