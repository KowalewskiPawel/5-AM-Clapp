import { ethers } from "ethers";
import { useState, useEffect } from "react";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import { CONTRACT_ADDRESS } from "./consts";
import FiveAmClapp from "./abi/FiveAmClapp.json";

import transformMemberData from "./utils/transformMemberData";

import "./styles/app.css";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [memberNFT, setMemberNFT] = useState(null);
  const [memberBalance, setMemberBalance] = useState(null);
  const [stakeAmount, setStakeAmount] = useState(null);
  const [mintingNFT, setMintingNFT] = useState(false);
  const [mintingError, setMintingError] = useState(false);
  const [nftMinted, setNFTMinted] = useState(false);
  const [dappContract, setDappContract] = useState(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stakedBet, setStakedBet] = useState(null);
  const [stakingError, setStakingError] = useState(false);
  const [withdrawingError, setWithdrawingError] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        setIsLoading(false);
        return;
      } else {
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
          const account = accounts[0];
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      if (window.ethereum.networkVersion !== "80001") {
        alert("Please switch network to Polygon Mumbai and try again");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const mintNFT = async (memberName, memberTimeZone) => {
    try {
      setMintingNFT(true);
      const mintTxn = await dappContract.mintMembershipNFT(
        memberName,
        memberTimeZone
      );
      await mintTxn.wait();
      setMintingNFT(false);
      setNFTMinted(true);
    } catch (error) {
      console.warn("Error: ", error);
      setMintingNFT(false);
      setMintingError(true);
    }
  };

  const stakeBet = async () => {
    try {
      setIsLoading(true);
      setStakingError(false);
      const betTxn = await dappContract.stakeCommitment({
        value: ethers.utils.parseEther(stakeAmount),
      });
      await betTxn.wait();
      setStakedBet(stakeAmount);
      setStakeAmount(null);
      setIsLoading(false);
    } catch (error) {
      console.warn("Error: ", error);
      setStakingError(true);
      setIsLoading(false);
    }
  };

  const withdrawBet = async () => {
    try {
      setIsLoading(true);
      setWithdrawingError(false);
      const betTxn = await dappContract.withdrawCommitment();
      await betTxn.wait();
      setStakedBet(null);
      setIsLoading(false);
    } catch (error) {
      console.warn("Error: ", error);
      setWithdrawingError(true);
      setIsLoading(false);
    }
  };

  const didStake = async () => {
    try {
      const didStake = await dappContract.didStake();
      const stake = ethers.utils.formatEther(didStake);

      if (stake !== "0.0") {
        setStakedBet(stake);
      }
    } catch (error) {
      console.warn("Error: ", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const dappContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        FiveAmClapp.abi,
        signer
      );

      setDappContract(dappContract);

      const memberNFT = await dappContract.checkIfUserHasNFT();
      if (memberNFT.name) {
        setMemberNFT(transformMemberData(memberNFT));
        const balance = await signer.getBalance();
        const balanceInMatic = ethers.utils.formatEther(balance);
        setMemberBalance(balanceInMatic);
        setIsDashboardOpen(true);
      }
      setIsLoading(false);
      didStake();
    };

    if (currentAccount) {
      fetchNFTMetadata();
    }
  }, [currentAccount, memberBalance, stakeAmount]);

  return (
    <>
      <Navbar connectWallet={connectWallet} currentAccount={currentAccount} />
      {!isDashboardOpen && (
        <Hero
          mintNFT={mintNFT}
          currentAccount={currentAccount}
          isMinting={mintingNFT}
          isFetching={isLoading}
          mintingError={mintingError}
          nftMinted={nftMinted}
          setMintingError={setMintingError}
          setIsDashboardOpen={setIsDashboardOpen}
        />
      )}
      {isDashboardOpen && (
        <Dashboard
          memberBalance={memberBalance}
          memberNFT={memberNFT}
          stakeBet={stakeBet}
          stakedBet={stakedBet}
          stakingError={stakingError}
          setStakeAmount={setStakeAmount}
          withdrawBet={withdrawBet}
          withdrawingError={withdrawingError}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default App;
