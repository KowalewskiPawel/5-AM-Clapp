import { ethers } from "ethers";
import { useState, useEffect } from "react";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

import { CONTRACT_ADDRESS } from "./consts";
import FiveAmClub from "./abi/FiveAmClub.json";

import transformMemberData from "./utils/transformMemberData";

import "./styles/app.css";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [memberNFT, setMemberNFT] = useState(null);
  const [mintingNFT, setMintingNFT] = useState(false);
  const [dappContract, setDappContract] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const mintNFT = (memberName, memberTimeZone) => async () => {
    try {
      setMintingNFT(true);
      const mintTxn = await dappContract.mintMembershipNFT(
        memberName,
        memberTimeZone
      );
      await mintTxn.wait();
      setMintingNFT(false);
    } catch (error) {
      console.warn("Error:", error);
      setMintingNFT(false);
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
        FiveAmClub.abi,
        signer
      );

      setDappContract(dappContract);

      const memberNFT = await dappContract.checkIfUserHasNFT();
      if (memberNFT.name) {
        setMemberNFT(transformMemberData(memberNFT));
      }
      setIsLoading(false);
    };

    if (currentAccount) {
      fetchNFTMetadata();
    }
  }, [currentAccount]);

  return (
    <>
      <Navbar connectWallet={connectWallet} currentAccount={currentAccount} />
      <Hero mintNFT={mintNFT} currentAccount={currentAccount} />
    </>
  );
};

export default App;
