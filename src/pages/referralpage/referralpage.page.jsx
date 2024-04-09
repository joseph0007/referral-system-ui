import React from "react";
import { createStructuredSelector } from "reselect";
import { ToastContainer, toast } from 'react-toastify';
import { connect } from "react-redux";
import { errorMessage, isReferralDataLoaded, selectReferralLink, selectReferrals } from "../../redux/referrals/referral.selectors";
import { fetchReferralDataProcessing, getReferralLinkProcessing, createReferralLinkProcessing } from "../../redux/referrals/referral.actions"
import { ReferralPageContainer } from "./referralpage.styles";
import { Profiler } from "react";
import { selectCurrentUser } from "../../redux/users/users.selectors";

import 'react-toastify/dist/ReactToastify.css';

const ReferralPage = ({ isDataAvail, referrals, currentUser, fetchReferralData, referralLink, getReferralLink, createReferralLink, errorMessage }) => {
  React.useEffect(() => {
    fetchReferralData(currentUser);
    getReferralLink(currentUser);
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

  return (
    <>
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
          <p style={{
            marginBottom: "2rem"
          }}> 
            Note: Generating a new referral link will cause all the previous referral links to become invalid. 
          </p>
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
      <ToastContainer />
    </>
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
  referralLink: selectReferralLink,
  errorMessage: errorMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferralPage);
