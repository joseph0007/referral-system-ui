import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { ScorePageContainer } from "./scorepage.styles";
import { Profiler } from "react";
import { isReferralDataLoaded, selectReferrals } from "../../redux/referrals/referral.selectors";
import { fetchReferralDataProcessing } from "../../redux/referrals/referral.actions";
import { selectCurrentUser } from "../../redux/users/users.selectors";

const ScorePage = ({ isDataAvail, referrals, currentUser, fetchReferralData }) => {
  React.useEffect(() => {
    fetchReferralData(currentUser);
  }, []);

  console.log("referrals ", referrals);
  return (
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
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchReferralData: (currentUser) => dispatch(fetchReferralDataProcessing(currentUser)),
});

const mapStateToProps = createStructuredSelector({
  isDataAvail: isReferralDataLoaded,
  referrals: selectReferrals,
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(ScorePage);