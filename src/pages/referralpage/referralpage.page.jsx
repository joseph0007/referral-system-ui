import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { isReferralDataLoaded, selectReferralLink, selectReferrals } from "../../redux/referrals/referral.selectors";
import { fetchReferralDataProcessing, getReferralLinkProcessing, createReferralLinkProcessing } from "../../redux/referrals/referral.actions"
import { ReferralPageContainer } from "./referralpage.styles";
import { Profiler } from "react";
import { selectCurrentUser } from "../../redux/users/users.selectors";

const ReferralPage = ({ isDataAvail, referrals, currentUser, fetchReferralData, referralLink, getReferralLink, createReferralLink }) => {
  React.useEffect(() => {
    fetchReferralData(currentUser);
    getReferralLink(currentUser);
  }, []);

  return (
    <ReferralPageContainer>
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
        <div style={{
          display: "flex",
          marginBottom: "2rem"
        }}>
          <p style={{
            marginRight: "1rem"
          }}>
            Referral Link: {referralLink}
          </p>

          <button onClick={() => {
            createReferralLink();
          }}>
            Generate new link
          </button>
        </div>
        <h3 style={{
          marginBottom: "1rem"
        }}>
          Referrals
        </h3>
        <div>
          {
            isDataAvail && referrals ? 
            referrals.map((el) => {
              console.log("el ", el);
              return (
                <div style={{
                  marginBottom: '10px'
                }}> 
                  <div>
                    {el.referralId.name}
                  </div>
                  <div>
                    {el.referralId.email}
                  </div>
                </div>
              )
            }) :
            <>No data Available!</>
          }
        </div>
      </Profiler>
    </ReferralPageContainer>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchReferralData: (currentUser) => dispatch(fetchReferralDataProcessing(currentUser)),
  getReferralLink: (currentUser) => dispatch(getReferralLinkProcessing(currentUser)),
  createReferralLink: () => dispatch(createReferralLinkProcessing()),
});

const mapStateToProps = createStructuredSelector({
  isDataAvail: isReferralDataLoaded,
  referrals: selectReferrals,
  currentUser: selectCurrentUser,
  referralLink: selectReferralLink
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferralPage);