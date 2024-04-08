import { createSelector } from "reselect";

const selectReferral = (state) => state.referral;

export const selectReferrals = createSelector(
  [selectReferral],
  (referral) => referral.referrals
);

export const selectIsFetching = createSelector(
  [selectReferral],
  (referral) => referral.isFetching
);

export const isReferralDataLoaded = createSelector(
  [selectReferral],
  (referral) => !!referral.referrals
);

export const errorMessage = createSelector(
  [selectReferral],
  (referral) => referral.errorMessage
)

export const selectReferralLink = createSelector(
  [selectReferral],
  (referral) => referral.referralLink
)