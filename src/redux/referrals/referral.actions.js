import { referralTypes } from "./referral.types";

// fetch all user referrals
export const fetchReferralDataProcessing = (currentUser) => ({
  type: referralTypes.FETCH_REFERRALDATA_PROCESSING,
  payload: currentUser
});

export const fetchReferralDataSuccess = (data) => ({
  type: referralTypes.FETCH_REFERRALDATA_SUCCESS,
  payload: data,
});

export const fetchReferralDataFailure = (errorMessage) => ({
  type: referralTypes.FETCH_REFERRALDATA_FAILURE,
  payload: errorMessage,
});

// create referral Link
export const createReferralLinkProcessing = () => ({
  type: referralTypes.CREATE_REFERRALLINK_PROCESSING,
});

export const createReferralLinkSuccess = (data) => ({
  type: referralTypes.CREATE_REFERRALLINK_SUCCESS,
  payload: data,
});

export const createReferralLinkFailure = (errorMessage) => ({
  type: referralTypes.CREATE_REFERRALLINK_FAILURE,
  payload: errorMessage,
});

// get referral Link
export const getReferralLinkProcessing = (currentUser) => ({
  type: referralTypes.GET_REFERRALLINK_PROCESSING,
  payload: currentUser
});

export const getReferralLinkSuccess = (data) => ({
  type: referralTypes.GET_REFERRALLINK_SUCCESS,
  payload: data,
});

export const getReferralLinkFailure = (errorMessage) => ({
  type: referralTypes.GET_REFERRALLINK_FAILURE,
  payload: errorMessage,
});