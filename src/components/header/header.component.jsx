import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  HeaderContainer,
  OptionLink,
  OptionsContainer,
  LogoContainer,
} from "./header.styles";

import Logo from "../../assets/crown.svg";
import { selectCurrentUser } from "../../redux/users/users.selectors";
import { selectWalletData } from "../../redux/wallet/wallet.selectors";
import { userLogoutStart } from "../../redux/users/users.actions";
import MeatMaskButton from "../metamaskWallet/metamaskWallet.component";

const Header = ({ currentUser, userLogout, walletData }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <img style={{ width: "100%", height: "100%" }} className="logo" src={Logo} alt="Logo" />
    </LogoContainer>

    <OptionsContainer>
      {
        walletData && walletData.account 
        ? 
          <>
            <OptionLink to="/referrals">Referral</OptionLink>
            <OptionLink to="/scores">Score</OptionLink>
          </>
        :
          <></>
      }
      
      {currentUser ? (
        <>
          <OptionLink
            as="div"
            onClick={() => userLogout(currentUser)}
            style={{ cursor: "pointer" }}
          >
            Sign out
          </OptionLink>
          <MeatMaskButton />
        </>
      ) : (
        <OptionLink to="/signin">Sign in</OptionLink>
      )}
    </OptionsContainer>
  </HeaderContainer>
);
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  walletData: selectWalletData 
});

const mapDispatchToProps = (dispatch) => ({
  userLogout: (currentUser) => dispatch(userLogoutStart(currentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
