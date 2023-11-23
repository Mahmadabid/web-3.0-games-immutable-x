// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Mint is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    string private mintingPassword;

    constructor(string memory _mintingPassword)
        ERC721("Mint", "MTK")
    {
        mintingPassword = _mintingPassword;
    }

    function safeMint(address to, string memory uri, string memory password) public {
        require(keccak256(abi.encodePacked(password)) == keccak256(abi.encodePacked(mintingPassword)), "Incorrect password");

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function changePassword(string memory newPassword) public onlyOwner {
        mintingPassword = newPassword;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
