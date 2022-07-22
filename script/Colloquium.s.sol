// SPDX-License-Identifier: MIT 
pragma solidity 0.8.13;

import "forge-std/Script.sol";
import "src/Colloquium.sol";

contract ColloquiumScript is Script {
    function run() public {
        vm.startBroadcast();

        Colloquium colloquium = new Colloquium();

        vm.stopBroadcast();
    }
}
