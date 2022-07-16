// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/Author.sol";

contract AuthorTest is Test {
    event Mint(address indexed minter, uint256 indexed tokenId, string indexed indexedContentId, string contentId);

    Author internal author;

    function setUp() public {
        author = new Author();
    }

    function testTokenHasName() public {
        assertEq(author.name(), "Author");
    }

    function testTokenHasSymbol() public {
        assertEq(author.symbol(), "AUT");
    }

    function testTokenHasUri() public {
        string memory cid = "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF";
        uint256 tokenId = uint256(keccak256(abi.encode(cid)));

        vm.prank(address(2));
        author.mint(address(1), cid);

        assertEq(author.tokenURI(tokenId), "https://ipfs.io/ipfs/QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF");
    }

    function testTokenIsMintable() public {
        string memory cid = "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF";
        uint256 tokenId = uint256(keccak256(abi.encode(cid)));

        vm.prank(address(2));
        author.mint(address(1), cid);
        assertEq(author.balanceOf(address(1)), 1);
        assertEq(author.ownerOf(tokenId), address(1));
    }

    function testTokenStoresContentIdentifier() public {
        string memory cid = "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF";
        uint256 tokenId = uint256(keccak256(abi.encode(cid)));

        vm.prank(address(2));
        author.mint(address(1), cid);
        assertEq(author.contentIdentifierByTokenId(tokenId), cid);
    }

    function testMintEmitsEvent() public {
        string memory cid = "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF";
        uint256 tokenId = uint256(keccak256(abi.encode(cid)));

        // need to change this from address 1 to address 2 if I change mint to msg.sender
        vm.expectEmit(true, true, true, false); // how does this even work?
        emit Mint(address(1), tokenId, cid, cid);
        vm.prank(address(2));
        author.mint(address(1), cid);
    }
}
