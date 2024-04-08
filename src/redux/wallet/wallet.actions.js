import { walletTypes } from "./wallet.types";

export const setWalletData = (walletData) => ({
  type: walletTypes.FETCH_WALLET_SET,
  payload: walletData,
});

export const removeWalletData = () => ({
  type: walletTypes.FETCH_WALLET_REMOVE,
  payload: null,
});
