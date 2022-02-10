import { useState } from "react";

import StyledHero from "./StyledHero";
import StyledForm from "./StyledForm";
import StyledInputRow from "./StyledInputRow";
import StyledSelect from "./StyledSelect";
import StyledInput from "./StyledInput";
import OutterWrapper from "./OutterWrapper";
import Title from "./Title";
import Description from "./Description";
import StyledButton from "./StyledButton";
import Warning from "./Warning";
import Loading from "../Loading";

const Hero = ({
  currentAccount,
  nftMinted,
  mintNFT,
  isMinting,
  mintingError,
  setMintingError,
  setIsDashboardOpen,
  isFetching,
}) => {
  const [isJoining, setIsJoining] = useState(false);
  const [warning, setWarning] = useState(false);
  const [memberNickname, setMemberNickname] = useState("");
  const [memberTimeZone, setMemberTimeZone] = useState(0);

  const submitForm = (event) => {
    event.preventDefault();

    mintNFT(memberNickname, memberTimeZone);
  };

  const checkConnection = () => {
    if (!currentAccount) {
      return setWarning(true);
    }

    setWarning(false);
    setIsJoining(true);
  };

  const renderSwitch = () => {
    if (nftMinted) {
      return (
        <OutterWrapper>
          <Title>Congratulations! Now you are a member of 5 AM Clapp :)</Title>
          <Description>
            Click "OK" to move to the user dashboard, from where you can stake
            your commitments, track your achievement, and clam the rewards.
          </Description>
          <StyledButton onClick={() => setIsDashboardOpen(true)}>
            <span>OK</span>
          </StyledButton>
        </OutterWrapper>
      );
    }

    if (mintingError) {
      return (
        <OutterWrapper isLoading={true}>
          <Warning>Error :( Please try again</Warning>
          <StyledButton onClick={() => setMintingError(false)}>
            <span>Try Again</span>
          </StyledButton>
        </OutterWrapper>
      );
    }

    if (isMinting) {
      return (
        <OutterWrapper isLoading={true}>
          <Description>
            {isFetching ? "Loading " : "Minting "}Membership NFT
          </Description>
          <Loading />
        </OutterWrapper>
      );
    }

    if (isJoining && currentAccount) {
      return (
        <OutterWrapper>
          <Description>
            Please create your unique NFT membership token of Five AM Clapp, so
            that you can track your achievements and claim the rewards! :)
          </Description>
          <StyledForm id="mint_nft" onSubmit={submitForm}>
            <StyledInputRow>
              <label htmlFor="nickname">Nickname: </label>
              <StyledInput
                type="text"
                placeholder="Enter your nickname"
                name="nickname"
                value={memberNickname}
                onChange={(event) => setMemberNickname(event.target.value)}
                required
              />
            </StyledInputRow>
            <StyledInputRow>
              <label htmlFor="time_zone">Time Zone: </label>
              <StyledSelect
                name="time_zone"
                defaultValue={0}
                required
                onChange={(event) => setMemberTimeZone(event.target.value)}
              >
                <option value={23}>GMT-11:00</option>
                <option value={22}>GMT-10:00</option>
                <option value={21}>GMT-9:00</option>
                <option value={20}>GMT-8:00</option>
                <option value={19}>GMT-7:00</option>
                <option value={18}>GMT-6:00</option>
                <option value={17}>GMT-5:00</option>
                <option value={16}>GMT-4:00</option>
                <option value={15}>GMT-3:00</option>
                <option value={13}>GMT-1:00</option>
                <option value={0}>GMT</option>
                <option value={1}>GMT+1:00</option>
                <option value={2}>GMT+2:00</option>
                <option value={3}>GMT+3:00</option>
                <option value={4}>GMT+4:00</option>
                <option value={5}>GMT+5:00</option>
                <option value={6}>GMT+6:00</option>
                <option value={7}>GMT+7:00</option>
                <option value={8}>GMT+8:00</option>
                <option value={9}>GMT+9:00</option>
                <option value={10}>GMT+10:00</option>
                <option value={11}>GMT+11:00</option>
                <option value={12}>GMT+12:00</option>
              </StyledSelect>
            </StyledInputRow>
          </StyledForm>
          <StyledButton type="submit" form="mint_nft">
            <span>Mint Membership NFT</span>
          </StyledButton>
        </OutterWrapper>
      );
    }

    if (!isJoining || !currentAccount) {
      return (
        <OutterWrapper>
          <Title>
            Wake Up with <br />5 AM Clapp
          </Title>
          <Description>
            Waking up at 5 AM has many advantages, you can finally find extra
            time for your hobbies, business or general well-being. However, many
            of us struggle to find enough motivation/ discipline. Change it
            today! Stake your money with 5 AM Clapp, wake up to get it back,
            plus earn some extra cash from rewards. Join our clapp today! :)
          </Description>
          {warning && (
            <Warning>
              Please connect your wallet, switch to Polygon Mumbai network and
              try again.
            </Warning>
          )}
          <StyledButton onClick={checkConnection}>
            <span>Join The Clapp</span>
          </StyledButton>
        </OutterWrapper>
      );
    }
  };

  return <StyledHero>{renderSwitch()}</StyledHero>;
};

export default Hero;
