import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const baseTokenURI = 'https://blush-accepted-turkey-504.mypinata.cloud/ipfs//QmYfPWKWCtfpg4ZeNo9LqXvYjfnnMQG2BKbWqipLYYv6KB'; // Replace with your Pinata IPFS base URI

  const MyNFT = await ethers.getContractFactory('MyNFT');
  const myNFT = await MyNFT.deploy('MyNFT', 'MNFT', baseTokenURI);

  await myNFT.deployed();

  console.log('MyNFT contract address:', myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
