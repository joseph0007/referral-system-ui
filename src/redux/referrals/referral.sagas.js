import { call, put, takeEvery, all } from "redux-saga/effects";
import { referralTypes } from "./referral.types";
import { 
  fetchReferralDataSuccess, 
  fetchReferralDataFailure,
  createReferralLinkSuccess,
  createReferralLinkFailure,
  getReferralLinkSuccess,
  getReferralLinkFailure
} from "./referral.actions";
import { getUserReferralLink, getUserReferrals, createUserReferralLink } from "../../utils/apis/apis";

export function* fetchReferralCollectionsAsync({ payload }) {
  try {
    const referralData = yield getUserReferrals(payload);
    yield put(fetchReferralDataSuccess(referralData.data));
  } catch (error) {
    yield put(fetchReferralDataFailure(error.message));
  }
}

export function* fetchReferralCollectionsStart() {
  yield takeEvery(
    referralTypes.FETCH_REFERRALDATA_PROCESSING,
    fetchReferralCollectionsAsync
  );
}

export function* createReferralLinkAsync() {
  try {
    const referralData = yield createUserReferralLink();

    let referralLink = "";
    if( referralData && typeof referralData.data === 'object' && referralData.data.referralLink ) {
      referralLink = referralData.data.referralLink;
    }

    yield put(createReferralLinkSuccess(referralLink));
  } catch (error) {
    yield put(createReferralLinkFailure(error.message));
  }
}

export function* createReferralLink() {
  yield takeEvery(
    referralTypes.CREATE_REFERRALLINK_PROCESSING,
    createReferralLinkAsync
  );
}

export function* getReferralLinkAsync({ payload }) {
  try {
    const referralData = yield getUserReferralLink(payload);

    let referralLink = "";
    if( referralData && typeof referralData.data === 'object' && referralData.data.referralLink ) {
      referralLink = referralData.data.referralLink;
    }

    yield put(getReferralLinkSuccess(referralLink));
  } catch (error) {
    yield put(getReferralLinkFailure(error.message));
  }
}

export function* getReferralLink() {
  yield takeEvery(
    referralTypes.GET_REFERRALLINK_PROCESSING,
    getReferralLinkAsync
  );
}

export function* referralSagas() {
  yield all([
    call(createReferralLink),
    call(getReferralLink),
    call(fetchReferralCollectionsStart),
  ]);
}
