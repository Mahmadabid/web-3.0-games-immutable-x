import { ethers, upgrades } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const Mint = await ethers.getContractFactory('Mint');
  const mint = await upgrades.deployProxy(Mint, [process.env.MINTING_PASSWORD], { initializer: 'initialize' });
  await mint.deployed();

  console.log('Mint contract deployed to:', mint.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
