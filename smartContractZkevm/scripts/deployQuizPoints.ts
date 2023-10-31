import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying the contract with the account: ${deployer.address}`);

  const BuyQuizPoints = await ethers.getContractFactory('BuyQuizPoints');
  const buyQuizPoints = await BuyQuizPoints.deploy();

  await buyQuizPoints.deployed();

  console.log(`Contract address: ${buyQuizPoints.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
