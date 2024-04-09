import { createSelector } from "reselect";

const selectWallet = (state) => state.wallet;

export const selectWalletData = createSelector(
  [selectWallet],
  (wallet) => wallet.walletData
);

export const errorMessage = createSelector(
  [selectWallet],
  (wallet) => wallet.errorMessage
)