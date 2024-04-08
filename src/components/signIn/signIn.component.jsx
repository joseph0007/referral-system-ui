import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import FormInput from "../formInput/formInput.component";
import CustomButton from "../customButton/customButton.component";
// import { signInWithGoogle } from "../../utils/firebase/firebase.utils";
import { auth } from "../../utils/firebase/firebase.utils";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/users/users.actions";

import "./signIn.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      this.setState({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("user not logged in!!", error);
    }
  };

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    const { signInWithGoogle, signInWithEmail } = this.props;
    const { email, password } = this.state;

    let referral = "";
    if( typeof this.props.match === 'object' && typeof this.props.match.params === 'object' && this.props.match.params.referralCode ) {
      referral = this.props.match.params.referralCode;
    }

    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>

        {/* onSubmit={this.handleSubmit} */}
        <form>
          <FormInput
            handleChange={this.handleChange}
            type="email"
            label="email"
            name="email"
            value={this.state.email}
            id="email"
            required
          />

          <FormInput
            handleChange={this.handleChange}
            type="password"
            label="password"
            name="password"
            value={this.state.password}
            id="password"
            required
          />

          <div className="button-group">
            <CustomButton
              type="button"
              onClick={() =>
                signInWithEmail({
                  email,
                  password,
                })
              }
            >
              {" "}
              Sign in
            </CustomButton>
            <CustomButton
              type="button"
              onClick={() => signInWithGoogle(referral)}
              isGoogleSignIn
            >
              sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signInWithGoogle: (referral) => dispatch(googleSignInStart(referral)),
  signInWithEmail: (emailAndPass) => dispatch(emailSignInStart(emailAndPass)),
});

export default withRouter(connect(null, mapDispatchToProps)(SignIn));
