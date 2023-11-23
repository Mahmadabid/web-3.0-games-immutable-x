import { ethers } from 'hardhat';

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const initialPassword = process.env.MINTING_PASSWORD;
  const mintNFTS = await ethers.getContractFactory('Mint');
  
  const deploymentOptions = { gasPrice: ethers.utils.parseUnits('100', 'gwei') };

  const contract = await mintNFTS.deploy(initialPassword, deploymentOptions);

  await contract.deployed();

  console.log(`Mint contract deployed to: ${contract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
