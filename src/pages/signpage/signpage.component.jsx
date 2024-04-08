import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./signpage.styles.scss";
import SignIn from "../../components/signIn/signIn.component";
import SignUp from "../../components/signUp/signup.component";
import { selectUserError } from "../../redux/users/users.selectors";

const SignInPage = ({ error }) => {
  console.log("error ", error);
  if( error && error.message && error.statusCode !== 401 ) {
    alert(error.message);
  }

  return (
    <div className="sign-container">
      <SignIn></SignIn>
      <SignUp></SignUp>
    </div>
  )
  };

const mapStateToProps = createStructuredSelector({
  error: selectUserError
});

export default connect(mapStateToProps)(SignInPage);
