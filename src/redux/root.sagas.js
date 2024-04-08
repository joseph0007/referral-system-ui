import { all, call } from "redux-saga/effects";

import { referralSagas } from "./referrals/referral.sagas";
import { userSagas } from "./users/user.sagas";

export default function* rootSaga() {
  yield all([
    call(referralSagas),
    call(userSagas),
  ]);
}
