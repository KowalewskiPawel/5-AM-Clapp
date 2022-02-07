<br />
<h1 align="center">5 AM Clapp</h1>

## About The Project

Waking up at 5 AM has many advantages, you can finally find extra
time for your hobbies, business or general well-being. However, many
of us struggle to find enough motivation/ discipline. Change it
today! Stake your money with 5 AM Clapp, wake up to get it back,
plus earn some extra cash from rewards. Join our clapp today!

After going to the dapp website, user will have to login with his/her wallet, and then mint a NFT token as a part of club membership subscription. Once the user is logged in and has minted membership NFT token, he/she can stake a portion of MATIC tokens, stating that he/she will wake up at 5 A.M. The application will send staked funds to the smart contract, and between 5:00 and 5:59, user will be able to see a button "I woke up!" which will also transfer staked funds back to the user. There will be a simple question to answer and captcha (to ensure that the action is not made by any bot and that user really woke up). For each successful commitment, user will get his/her funds back, plus he/she will be rewarded with 5AM tokens. Each time users gets at least 30 5AM tokens, she/he will be able to claim a reward from the pool of the contract, in other words undisciplined users will be punished while disciplined ones rewarded. :)

### Built With

- [Hardhat](https://hardhat.org/)
- [Solidity](https://docs.soliditylang.org/en/v0.8.11/)
- [Alchemy](https://www.alchemy.com/)
- [React](https://reactjs.org/)
- [Styed Components](https://styled-components.com/)

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Metmask](https://metamask.io/)

### Installation

1. Install all the dependencies - `npm install`

2. Create an account on Alchemy, then create a new app and select "Polygon Mumbai" as a network.

3. Create a `.env` file in the root folder and add the
   following variables:

```
   API_URL=<ALCHEMY_API_URL>
   API_KEY=<THE_LAST_PART OF_THE_API_URL>
   PRIVATE_KEY=<YOUR_WALLET'S_PRIVATE_KEY>
   CONTRACT_ADDRESS=<DEPOLOYED_TOKEN_ADDRESS>
   REACT_APP_CONTRACT_ADDRESS=<DEPOLOYED_TOKEN_ADDRESS>
```

Hint: You can get your own API key in the alchemy dashboard. The last part can be added after deploying the token.

### Compiling the Contract

run `npx hardhat compile` command.

### Deploying Smart Contract

Run `npx hardhat run scripts/deploy.js --network mumbai` command.

### Live Preview

[https://kowalewskipawel.github.io/5-AM-Clapp/](https://kowalewskipawel.github.io/5-AM-Clapp/)
