import StyledNavbar from "./StyledNavbar";
import OutterWrapper from "./OutterWrapper";
import Logo from "./Logo";
import WalletButton from "./WalletButton";

import LogoIcon from "../../assets/LogoIcon.png";

const Navbar = ({ connectWallet, currentAccount }) => (
  <StyledNavbar>
    <OutterWrapper>
      <Logo>
        <img src={LogoIcon} alt="Logo Icon" /> 5 AM Clapp
      </Logo>
      <WalletButton
        connectWallet={connectWallet}
        currentAccount={currentAccount}
      />
    </OutterWrapper>
  </StyledNavbar>
);

export default Navbar;
