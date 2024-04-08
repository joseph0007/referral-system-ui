import userTypes from "./user.types";

// export const setCurrentUser = (user) => {
//   return {
//     type: userTypes.SET_CURRENT_USER,
//     payload: user,
//   };
// };

export const googleSignInStart = (referral) => ({
  type: userTypes.GOOGLE_SIGN_IN_START,
  payload: {
    referral
  }
});

export const emailSignInStart = (emailAndPass) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPass,
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: userTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const userLogoutStart = () => ({
  type: userTypes.USER_LOGOUT_START,
});

export const userLogoutSuccess = () => ({
  type: userTypes.USER_LOGOUT_SUCCESS,
});

export const userLogoutFailure = (error) => ({
  type: userTypes.USER_LOGOUT_FAILURE,
  payload: error,
});

export const checkUserAuthStateStart = () => ({
  type: userTypes.CHECK_USER_AUTH_STATE,
});

export const signUpStart = (userData) => ({
  type: userTypes.SIGN_UP_START,
  payload: userData,
});

export const signUpSuccess = (user) => ({
  type: userTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signUpFailure = (error) => ({
  type: userTypes.SIGN_UP_FAILURE,
  payload: error,
});

// export default setCurrentUser;
