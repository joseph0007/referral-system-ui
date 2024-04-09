import React from "react";
import { createStructuredSelector } from "reselect";
import { ToastContainer, toast } from 'react-toastify';
import { connect } from "react-redux";
import { ScorePageContainer } from "./scorepage.styles";
import { Profiler } from "react";
import { errorMessage, isReferralDataLoaded, selectReferrals } from "../../redux/referrals/referral.selectors";
import { fetchReferralDataProcessing } from "../../redux/referrals/referral.actions";
import { selectCurrentUser } from "../../redux/users/users.selectors";
import 'react-toastify/dist/ReactToastify.css';

const ScorePage = ({ isDataAvail, referrals, currentUser, fetchReferralData, errorMessage }) => {
  React.useEffect(() => {
    fetchReferralData(currentUser);
  }, []);

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

  console.log("referrals ", referrals);
  return (
    <>
      <ScorePageContainer>
        <Profiler
          id="Menu"
          onRender={(id, phase, actualDuration) => {
            console.log({
              id,
              phase,
              actualDuration,
            });
          }}
        >
          <div>
            {
              isDataAvail && referrals ?
                <div>
                  Your total score is {referrals.reduce((acc, curr) => acc + curr.score, 0)}
                </div> :
                <>Your total score is 0</>
            }
          </div>
        </Profiler>
      </ScorePageContainer>
      <ToastContainer />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchReferralData: (currentUser) => dispatch(fetchReferralDataProcessing(currentUser)),
});

const mapStateToProps = createStructuredSelector({
  isDataAvail: isReferralDataLoaded,
  referrals: selectReferrals,
  currentUser: selectCurrentUser,
  errorMessage: errorMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(ScorePage);