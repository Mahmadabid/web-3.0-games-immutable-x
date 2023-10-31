// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuyQuizPoints {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {
        owner.transfer(msg.value);
    }
}
