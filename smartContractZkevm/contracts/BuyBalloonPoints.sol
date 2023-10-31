// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BalloonPointsPurchase {
    IERC20 public gasToken;
    address public recipient;

    constructor(IERC20 _gasToken, address _recipient) {
        gasToken = _gasToken;
        recipient = _recipient;
    }

    function sendGasTokens(uint256 amount) public {
        gasToken.transferFrom(msg.sender, recipient, amount);
    }
}
