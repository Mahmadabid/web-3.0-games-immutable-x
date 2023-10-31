import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying the contract with the account: ${deployer.address}`);

  const BuyBalloonPoints = await ethers.getContractFactory('BuyBalloonPoints');
  const buyBalloonPoints = await BuyBalloonPoints.deploy();

  await buyBalloonPoints.deployed();

  console.log(`Contract address: ${buyBalloonPoints.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
