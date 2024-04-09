import { referralTypes } from "./referral.types";

const INITIAL_STATE = {
  referralLink: "",
  referrals: null,
  isFetching: false,
  errorMessage: undefined,
};

const referralReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case referralTypes.GET_REFERRALLINK_PROCESSING:
    case referralTypes.CREATE_REFERRALLINK_PROCESSING:
    case referralTypes.FETCH_REFERRALDATA_PROCESSING: {
      return {
        ...state,
        isFetching: true,
        errorMessage: "",
      };
    }

    case referralTypes.FETCH_REFERRALDATA_SUCCESS: {
      return {
        ...state,
        referrals: action.payload,
        isFetching: false,
        errorMessage: "",
      };
    }

    case referralTypes.CREATE_REFERRALLINK_SUCCESS: {
      return {
        ...state,
        referralLink: action.payload,
        isFetching: false,
        errorMessage: "",
      };
    }

    case referralTypes.GET_REFERRALLINK_SUCCESS: {
      return {
        ...state,
        referralLink: action.payload || "",
        isFetching: false,
        errorMessage: "",
      };
    }

    case referralTypes.GET_REFERRALLINK_FAILURE:
    case referralTypes.CREATE_REFERRALLINK_FAILURE:
    case referralTypes.FETCH_REFERRALDATA_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default referralReducer;
