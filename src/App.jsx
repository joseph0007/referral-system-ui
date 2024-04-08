import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/header.component";
import { checkUserAuthStateStart } from "./redux/users/users.actions";
import { selectCurrentUser } from "./redux/users/users.selectors";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import GlobalStyles from "./App.styles";
import { selectWalletData } from "./redux/wallet/wallet.selectors.js";

const HomePage = lazy(() => import("./pages/homepage/homepage.page.jsx"));
const SignInPage = lazy(() => import("./pages/signpage/signpage.component"));
const ReferralPage = lazy(() => import("./pages/referralpage/referralpage.page"));
const ScorePage = lazy(() => import("./pages/scorepage/scorepage.page"));

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserAuthState, currentUser } = this.props;

    checkUserAuthState(currentUser);
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser, walletData } = this.props;
    let account = "";

    if( walletData !== null && typeof walletData === 'object' && walletData.account ) {
      account = walletData.account;
    }

    return (
      <div className="App">
        <GlobalStyles />
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path="/" component={HomePage} />
              <Route
                exact
                path="/signin"
                render={() =>
                  currentUser ? (
                    <Redirect to="/"></Redirect>
                  ) : (
                    <SignInPage />
                  )
                }
              />

              <Route
                exact
                path="/signin/:referralCode"
                render={() =>
                  currentUser ? (
                    <Redirect to="/"></Redirect>
                  ) : (
                    <SignInPage />
                  )
                }
              />
              <Route exact path="/referrals" render={() =>
                !currentUser ? (
                  <Redirect to="/signin"></Redirect>
                ) : !account ?
                  <Redirect to="/"></Redirect> :
                  <ReferralPage />

              }
              />
              <Route exact path="/scores" render={() =>
                !currentUser ? (
                  <Redirect to="/signin"></Redirect>
                ) : !account ?
                  <Redirect to="/"></Redirect> :
                  <ScorePage />

              }
              />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  walletData: selectWalletData
});

const mapDispatchToProps = (dispatch) => ({
  checkUserAuthState: (currentUser) => dispatch(checkUserAuthStateStart(currentUser)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
