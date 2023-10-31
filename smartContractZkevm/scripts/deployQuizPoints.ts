import { ethers } from 'hardhat';

async function main() {
  const QuizPointsPurchase = await ethers.getContractFactory('QuizPointsPurchase');
  const gasTokenAddress = '0x0000000000000000000000000000000000001010';
  const recipientAddress = '0xc463B7d21e824AAcCd57Aa70c6E2a490A6e39DCA';

  const contract = await QuizPointsPurchase.deploy(gasTokenAddress, recipientAddress);
  await contract.deployed();

  console.log('QuizPointsPurchase contract deployed to:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
