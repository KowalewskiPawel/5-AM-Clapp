const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/FiveAmClapp.sol/FiveAmClapp.json");

const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "maticmum"),
  API_KEY
);

const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const FiveAmClappContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

(async () => {
  process.stdout.write("Fetching the data. Please wait");
  const dotsIncrement = setInterval(() => {
    process.stdout.write(".");
  }, 1000);

  await FiveAmClappContract.stakeCommitment({
    value: 100,
  });

  clearInterval(dotsIncrement);
  process.stdout.write("\n");
})();
