import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
    case userTypes.SIGN_UP_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: "",
      };
    }

    case userTypes.USER_LOGOUT_FAILURE:
    case userTypes.SIGN_IN_FAILURE:
    case userTypes.SIGN_UP_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    case userTypes.USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        currentUser: null,
        errorMessage: "",
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
