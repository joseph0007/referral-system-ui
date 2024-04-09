import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ToastContainer, toast } from 'react-toastify';
import "./signpage.styles.scss";
import SignIn from "../../components/signIn/signIn.component";
import SignUp from "../../components/signUp/signup.component";
import { errorMessage } from "../../redux/users/users.selectors";
import 'react-toastify/dist/ReactToastify.css';

const SignInPage = ({ errorMessage }) => {
  if( errorMessage ) {
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      progress: undefined,
    });
  }

  return (
    <>
      <div className="sign-container">
        <SignIn></SignIn>
        <SignUp></SignUp>
      </div>
      <ToastContainer />
    </>
  )
  };

const mapStateToProps = createStructuredSelector({
  errorMessage: errorMessage
});

export default connect(mapStateToProps)(SignInPage);
