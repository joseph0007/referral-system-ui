import { walletTypes } from "./wallet.types";

const INITIAL_STATE = {
  walletData: null
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case walletTypes.FETCH_WALLET_REMOVE: {
      return {
        ...state,
        walletData: null,
      };
    }

    case walletTypes.FETCH_WALLET_SET: {
      return {
        ...state,
        walletData: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default walletReducer;
