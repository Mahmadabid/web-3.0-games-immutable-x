import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying the contract with the account: ${deployer.address}`);

  const BuyQuizPoints = await ethers.getContractFactory('BuyQuizPoints');
  const deploymentOptions = { gasPrice: ethers.utils.parseUnits('100', 'gwei') };

  const buyQuizPoints = await BuyQuizPoints.deploy(deploymentOptions);

  await buyQuizPoints.deployed();

  console.log(`Contract address: ${buyQuizPoints.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
