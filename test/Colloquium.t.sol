// SPDX-License-Identifier: MIT 
pragma solidity 0.8.13;

import "forge-std/Test.sol";

import "src/Colloquium.sol";

contract ColloquiumTest is Test {
    event Mint(address indexed minter, uint256 indexed tokenId, string indexed indexedContentId, string contentId);

    Colloquium internal colloquium;

    function setUp() public {
        colloquium = new Colloquium();
    }

    function testTokenHasName() public {
        assertEq(colloquium.name(), "Colloquium");
    }

    function testTokenHasSymbol() public {
        assertEq(colloquium.symbol(), "COL");
    }

    function testTokenHasUri() public {
        string memory cid = "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF";
        uint256 tokenId = uint256(keccak256(abi.encode(cid)));

        vm.prank(address(2));
        colloquium.mint(address(1), cid);

        assertEq(colloquium.tokenURI(tokenId), "https://ipfs.io/ipfs/QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF");
    }

    function testTokenIsMintable() public {
        string memory cid = "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF";
        uint256 tokenId = uint256(keccak256(abi.encode(cid)));

        vm.prank(address(2));
        colloquium.mint(address(1), cid);
        assertEq(colloquium.balanceOf(address(1)), 1);
        assertEq(colloquium.ownerOf(tokenId), address(1));
    }

    function testTokenStoresContentIdentifier() public {
        string memory cid = "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF";
        uint256 tokenId = uint256(keccak256(abi.encode(cid)));

        vm.prank(address(2));
        colloquium.mint(address(1), cid);
        assertEq(colloquium.contentIdentifierByTokenId(tokenId), cid);
    }

    function testMintEmitsEvent() public {
        string memory cid = "QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF";
        uint256 tokenId = uint256(keccak256(abi.encode(cid)));

        // need to change this from address 1 to address 2 if I change mint to msg.sender
        vm.expectEmit(true, true, true, false); // how does this even work?
        emit Mint(address(1), tokenId, cid, cid);
        vm.prank(address(2));
        colloquium.mint(address(1), cid);
    }
}
