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

const Hero = ({ currentAccount, mintNFT }) => {
  const [isJoining, setIsJoining] = useState(false);
  const [warning, setWarning] = useState(false);

  const checkConnection = () => {
    if (!currentAccount) {
      return setWarning(true);
    }

    setWarning(false);

    setIsJoining(true);
  };

  const renderSwitch = () => {
    if (isJoining && currentAccount) {
      return (
        <OutterWrapper>
          <Description>
            Please create your unique NFT membership token of Five AM Clapp, so
            that you can track your achievements and claim the rewards! :)
          </Description>
          <StyledForm>
            <StyledInputRow>
              <label for="nickname">Nickname: </label>
              <StyledInput
                type="text"
                placeholder="Enter your nickname"
                name="nickname"
                required
              />
            </StyledInputRow>
            <StyledInputRow>
              <label for="time_zone">Time Zone: </label>
              <StyledSelect name="time_zone">
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
                <option value={0} selected>
                  GMT
                </option>
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
          <StyledButton>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
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
