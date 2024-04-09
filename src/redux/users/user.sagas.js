import { takeLatest, put, call, all, takeEvery } from "redux-saga/effects";
import userTypes from "./user.types";

import {
  auth,
  googleProvider,
  createUserDocDB,
  userRef,
} from "../../utils/firebase/firebase.utils";
import {
  userLogoutSuccess,
  userLogoutFailure,
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
} from "./users.actions";
import {
  removeWalletData
} from "../wallet/wallet.actions";
import { 
  checkAndCreateUser, 
  checkUserLogin, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "../../utils/apis/apis";

/* ----------------------------- google sign in ----------------------------- */
export function* googleSignInStart(data) {
  try {
    let referral = "";

    if( data.payload && data.payload.referral ) {
      referral = data.payload.referral;
    }

    const { user: authUser } = yield auth.signInWithPopup(googleProvider);
    const token = yield auth?.currentUser?.getIdToken(true);

    const response = yield checkAndCreateUser(authUser, token, referral);

    const { status, message, user } = response;
    if( status !== "success" ) {
      throw response
    }

    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* isGoogleSignIn() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignInStart);
}

/* ------------------------------ email sign in ----------------------------- */
export function* emailAndPassLogin({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield signInWithEmailAndPassword({ email, password });

    const { status, user, message } = response;
    if( status !== "success" ) {
      throw response
    }

    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* emailAndPassLoginAsync() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailAndPassLogin);
}

/* ------------------- check user session for persistence ------------------- */
export function* checkUserAuth(currentUser) {
  try {
    if( currentUser.isOAuth ) {
      yield userRef();
    }
    
    const response = yield checkUserLogin();

    const { status, user } = response;
    if( status !== "success" ) {
      throw response;
    }

    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error.message));
    logout(currentUser);
  }
}

export function* checkUserAuthAsync() {
  yield takeEvery(userTypes.CHECK_USER_AUTH_STATE, checkUserAuth);
}

/* --------------------------------- logout --------------------------------- */
export function* logout(currentUser) {
  try {
    const response = yield signOut();
    
    if( currentUser.isOAuth ) {
      yield auth.signOut();
    }

    const { status } = response;
    
    if( status !== "success" ) {
      throw Error(message || "User create failed.");
    }

    yield put(removeWalletData());

    yield put(userLogoutSuccess());
  } catch (error) {
    yield put(userLogoutFailure(error));
  }
}

export function* userLogoutAsync() {
  yield takeEvery(userTypes.USER_LOGOUT_START, logout);
}

/* --------------------------------- sign up -------------------------------- */
export function* emailAndPassSignUp({ payload }) {
  try {
    const { email, password, name, referral, confirmPassword } = payload;

    const response = yield createUserWithEmailAndPassword({ 
      email, 
      password,
      name,
      confirmPassword,
      isOAuth: false,
      referral
    });
    const { user, status, message } = response;

    if( status !== "success" ) {
      throw Error(message || "User create failed.");
    }

    yield put(signUpSuccess(user));
  } catch (error) {
    yield put(signUpFailure(null));
  }
}

export function* emailAndPassSignUpAsync() {
  yield takeLatest(userTypes.SIGN_UP_START, emailAndPassSignUp);
}

export function* userSagas() {
  yield all([
    call(isGoogleSignIn),
    call(userLogoutAsync),
    call(emailAndPassLoginAsync),
    call(checkUserAuthAsync),
    call(emailAndPassSignUpAsync),
  ]);
}
