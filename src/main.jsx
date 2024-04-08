import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { MetaMaskProvider } from "@metamask/sdk-react";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor } from "./redux/store";

import store from "./redux/store";

// process.env.NODE_ENV = "development";

ReactDOM.render(
  <Provider store={store}>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Example React Dapp",
          url: window.location.href,
        },
        infuraAPIKey: import.meta.env.VITE_INFURA_API_KEY,
      }}
    >
      <React.StrictMode>
        <BrowserRouter>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </React.StrictMode>
    </MetaMaskProvider>
  </Provider>,
  document.getElementById("root")
);
