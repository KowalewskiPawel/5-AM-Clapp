import { useState, useEffect } from "react";

import StyledDashboard from "./StyledDashboard";
import OutterFlex from "./OutterFlex";
import StatsFlex from "./StatsFlex";
import Stats from "./Stats";
import Line from "./Line";
import Main from "./Main";
import StyledInputRow from "../Hero/StyledInputRow";
import StyledInput from "../Hero/StyledInput";
import StyledButton from "../Hero/StyledButton";
import Description from "../Hero/Description";
import Warning from "../Hero/Warning";
import Loading from "../Loading";

import Attempts from "../../assets/Attempts.png";
import Wins from "../../assets/Wins.png";
import Matic from "../../assets/Matic.png";
import Token from "../../assets/Token.png";
import OutterWrapper from "../Hero/OutterWrapper";
import MainFrame from "./MainFrame";
import Rewards from "./UserDashboard";

const Dashboard = ({
  memberBalance,
  memberNFT,
  setStakeAmount,
  stakeBet,
  stakingError,
  stakedBet,
  withdrawBet,
  withdrawingError,
  isLoading,
  rewardsError,
  claimRewards,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const renderSwitch = () => {
    if (isLoading) {
      return (
        <OutterWrapper isLoading={true}>
          <Loading />
        </OutterWrapper>
      );
    }

    if (stakedBet && stakedBet !== "0.0") {
      return (
        <>
          <StyledInputRow>
            <span>You have staked: {stakedBet} MATIC </span>
          </StyledInputRow>
          <Description>
            Now to get your money back, you will have to wake up at 5 and click
            the button below.
            <br />
            <em>
              You can only withdraw your money the next after your stake,
              between 5:00-5:59 according to the time zone you set while minting
              the NFT membership token.
            </em>
          </Description>
          {withdrawingError && (
            <Warning>Probably it's too early or too late :( </Warning>
          )}
          <StyledButton onClick={withdrawBet}>
            <span>I woke up! :)</span>
          </StyledButton>
        </>
      );
    }

    return (
      <>
        {" "}
        <h1>I will wake up at 5 A.M. tomorrow!</h1>
        <StyledInputRow>
          <label>Stake MATIC : </label>{" "}
          <StyledInput
            type="number"
            placeholder="Enter your bet"
            onChange={(event) => setStakeAmount(event.target.value)}
          />
        </StyledInputRow>
        {stakingError && (
          <Warning>Something went wrong :( Please try again</Warning>
        )}
        <StyledButton onClick={stakeBet}>
          <span>STAKE</span>
        </StyledButton>
      </>
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <StyledDashboard>
      <OutterFlex isDashboard={true}>
        <StatsFlex>
          <Stats>
            <h1>Wallet</h1>
            <span>
              <img src={Matic} alt="Matic" /> MATIC:{" "}
              {memberBalance?.slice(0, 10)}
            </span>
            <span>
              <img src={Token} alt="Token" /> 5 AM Tokens:{" "}
              {memberNFT.fiveAmTokens}
            </span>
            <Line />
            <h1>Rewards</h1>
            <span>Total Claimed: {memberNFT.totalClaimed} MATIC</span>
            <span>Total Staked: {memberNFT.totalStaked} MATIC</span>
            <Description>
              <em>
                You need at least 30 5AM tokens to be eligible for the rewards
                pool. Each time you claim your reward, 30 5AM tokens are
                withdrawn from your account.
              </em>
            </Description>
            {rewardsError && (
              <Warning>Something went wrong :( Please try again</Warning>
            )}
            <StyledButton onClick={claimRewards}>
              <span>Claim Rewards</span>
            </StyledButton>
          </Stats>
        </StatsFlex>
        <MainFrame>
          <Rewards>
            <h1>User Dashboard</h1>
            <span>Nickname: {memberNFT.name}</span>
            <span>Local Time: {currentTime.toLocaleTimeString()}</span>
            <span>
              <img src={Attempts} alt="Attempts" /> Total Attempts:{" "}
              {memberNFT.attempts}
            </span>
            <span>
              <img src={Wins} alt="Wins" /> Total Wins: {memberNFT.wokeUp}
            </span>
          </Rewards>
          <Main>{renderSwitch()}</Main>
        </MainFrame>
      </OutterFlex>
    </StyledDashboard>
  );
};

export default Dashboard;
