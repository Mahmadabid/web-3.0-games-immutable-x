// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuyBalloonPoints {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {
        owner.transfer(msg.value);
    }
}
