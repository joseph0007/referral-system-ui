import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
    case userTypes.SIGN_UP_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    }

    case userTypes.USER_LOGOUT_FAILURE:
    case userTypes.SIGN_IN_FAILURE:
    case userTypes.SIGN_UP_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case userTypes.USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        currentUser: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
