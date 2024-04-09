import { useSDK } from "@metamask/sdk-react";
import React from "react";
import { connect } from "react-redux";
import {
  setWalletData,
  removeWalletData
} from "../../redux/wallet/wallet.actions";

const MeatMaskButton = ({ setWalletData }) => {
  const [ account, setAccount ] = React.useState("");
  const { sdk, connected, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  if(connected) {
    setWalletData({
      account,
      chainId
    });
  } else {
    setWalletData(null);
  }

  return (
    <div>
      <button style={{ 
          padding: 10, 
          margin: 10,
          border: '1px solid brown',
          backgroundColor: 'orange'

        }} onClick={connect}>
        Connect Wallet
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setWalletData: (data) => dispatch(setWalletData(data)),
});

export default connect(null, mapDispatchToProps)(MeatMaskButton);
