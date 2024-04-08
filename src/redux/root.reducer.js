import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import userReducer from "./users/users.reducer";
import referralReducer from "./referrals/referral.reducer";
import walletReducer from "./wallet/wallet.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
  referral: referralReducer
});

const persistConfig = {
  // key value
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

// enhanced rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
