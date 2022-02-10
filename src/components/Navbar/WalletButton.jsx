import styled, { css } from "styled-components";

import WalletIcon from "../../assets/WalletIcon.png";

const StyledWalletButton = styled.button`
  display: flex;
  font-family: "Roboto", sans-serif;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  margin-right: -4rem;

  border: none;

  background: #f49090;
  border-radius: 12px;
  transition: 200ms ease-in-out;

  &:active {
    transform: scale(0.9);
  }

  &:hover {
    background: #fca5a5;
  }

  ${(props) =>
    props.connected &&
    css`
      background: #a1c3a2;

      &:hover {
        background: #a1c3a2;
      }
    `}

  @media (max-width: 880px) {
    gap: 5px;

    padding: 5px 10px;
    & > * {
      transform: scale(0.8);
    }
  }
`;

const WalletButton = ({ connectWallet, currentAccount }) => (
  <StyledWalletButton
    onClick={connectWallet}
    connected={currentAccount ? true : false}
  >
    <img src={WalletIcon} alt="wallet icon" />
    {currentAccount
      ? `Connected ${currentAccount.slice(0, 4)}...${currentAccount.slice(
          38,
          42
        )}`
      : "Connect Wallet"}
  </StyledWalletButton>
);

export default WalletButton;
