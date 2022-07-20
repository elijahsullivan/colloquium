// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.13;

import "solmate/tokens/ERC721.sol";

contract Colloquium is ERC721 {
    event Mint(address indexed minter, uint256 indexed tokenId, string indexed indexedContentId, string contentId);

    constructor() ERC721("Colloquium", "COL") {}

    mapping(uint256 => string) public contentIdentifierByTokenId;

    function tokenURI(uint256 id) public view override returns (string memory) {
        return string(abi.encodePacked("https://ipfs.io/ipfs/", contentIdentifierByTokenId[id]));
    }

    function mint(address to, string calldata cid) public {
        uint256 id = uint256(keccak256(abi.encode(cid)));
        contentIdentifierByTokenId[id] = cid;
        _safeMint(to, id);
        emit Mint(to, id, cid, cid);
    }
}
