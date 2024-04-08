import React from "react";
import { withRouter } from "react-router-dom";
import FormInput from "../formInput/formInput.component";
import CustomButton from "../customButton/customButton.component";
// import { auth, createUserDocDB } from "../../utils/firebase/firebase.utils";

import "./signup.styles.scss";
import { signUpStart } from "../../redux/users/users.actions";
import { connect } from "react-redux";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { signUpNewUser } = this.props;
    const { name, email, password, confirmPassword } = this.state;
    
    let referral = "";
    if( typeof this.props.match === 'object' && typeof this.props.match.params === 'object' && this.props.match.params.referralCode ) {
      referral = this.props.match.params.referralCode;
    }

    if (password !== confirmPassword) {
      return alert("password and confirm paswword dont match!!");
    }

    try {
      signUpNewUser({ name, email, password, confirmPassword, referral });

      this.setState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log("error creating the new user", error);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="sign-up">
        <h2 className="title">I dont have an account</h2>
        <span>Sign up with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            handleChange={this.handleChange}
            label="name"
            name="name"
            value={this.state.name}
            type="text"
            id="name-2"
            required
          />
          <FormInput
            label="email"
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            id="email-2"
            required
          />
          <FormInput
            label="password"
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.password}
            id="password-2"
            required
          />
          <FormInput
            label="confirm password"
            name="confirmPassword"
            type="password"
            handleChange={this.handleChange}
            value={this.state.confirmPassword}
            id="confirmPassword-2"
            required
          />

          <CustomButton>Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUpNewUser: (user) => dispatch(signUpStart(user)),
});

export default withRouter(connect(null, mapDispatchToProps)(SignUp));
