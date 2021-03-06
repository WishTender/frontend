import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { RouteContext } from "./contexts/RouteContext";

import Extension from "./components/Extension/Extension";
import { CurrencyContext } from "./contexts/CurrencyContext";
import { CountryContext } from "./contexts/CountryContext";
import { LocaleContext } from "./contexts/LocaleContext";
import { NotificationContext } from "./contexts/NotificationContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccountSettings from "./components/AccountSettings/AccountSettings";
import useTraceUpdate from "./scripts/useTraceUpdate";
// import React from 'react';k
// import './App.css';
import {
  clientCurrency,
  parsedCookies,
  chooseCurrency,
  getCurrencyList,
} from "./scripts/helpers";
import "./myapp.css";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import ThankYou from "./components/LandingPage/ThankYou";
import Menu from "./components/nav/Menu/Menu.js";
import Cart from "./components/Cart/Cart.js";
import Login from "./components/Login/Login.js";
import Logout from "./components/nav/LogoutButton/LogoutButton.js";
import WishTracker from "./components/WishTracker/WishTracker.js";
import ConfirmationEmail from "./components/Onboard/ConfirmationEmail/ConfirmationEmail";
import ConfirmEmail from "./components/Onboard/ConfirmEmail/ConfirmEmail";

import { ThemeProvider } from "@material-ui/styles";
import WishlistPage from "./components/WishlistPage/WishlistPage";

// import AddWish from "./components/wishlistpage/addwish1/AddWish.js";
import SignUp from "./components/Onboard/SignUp/SignUp";
import SetUp from "./components/Onboard/SetUp/SetUp";
// import './Styles/App.css';
import theme from "./theme";
import CheckOutSuccess from "./components/CheckOutSuccess/CheckOutSuccess";
// import WishForm from "./components/wishlistpage/AddWish/WishForm/WishForm";
import ConnectSuccess from "./components/ConnectSuccess/ConnectSucess";
import { CssBaseline, Dialog } from "@material-ui/core";
import StyledDialog from "./components/common/StyledDialog/StyledDialog";
import SelectCurrencyForm from "./components/SelectCurrencyForm/SelectCurrencyForm";
import ForgotPassword from "./components/ResetPassword/ForgotPassword";
import SendResetPassword from "./components/ResetPassword/SendResetPassword";
import ResetPassword from "./components/ResetPassword/ResetLinkFlow/ResetPassword";
import UpdateEmail from "./components/AccountSettings/UpdateEmail";
import LandingPageMenu from "./components/LandingPage/LandingPageMenu";
import StripeInstructions from "./components/WishlistPage/ProfileSection/StripeInstructions";

function App(props) {
  const { getUser } = useContext(UserContext);
  const { getCurrencyCookie, setCurrencyCookie, setCurrencyCookieAndContext } =
    useContext(CurrencyContext);

  const [user, setUser] = useState();
  const [currencyList, setCurrencyList] = useState([]);
  const [currency, setCurrency] = useState(null);
  const [currencyNeeded, setCurrencyNeeded] = useState(false);
  const { getNotifications } = useContext(NotificationContext);
  const [notifications, setNotifications] = useState();
  const [isCurrentUsersProfile, setIsCurrentUsersProfile] = useState();
  const cookies = parsedCookies();
  useTraceUpdate(App.name, props, { user });
  useEffect(() => {
    getUser().then((user) => {
      if (user && user?.currency) {
        setCurrency(user.currency);
      }
      if ((!user || !user?.currency) && parsedCookies().currency) {
        setCurrency(getCurrencyCookie());
      }
      setUser(user);
      const cookies = parsedCookies();
      const locale = cookies.locale ? JSON.parse(cookies.locale) : null;
      const currencies = getCurrencyList(locale);
      setCurrencyList(currencies);
      if (currencyNeeded) {
        // const currencies = getCurrencyList(JSON.parse(parsedCookies().locale));
        // setCurrencyList(currencies);
        // chooseCurrency(JSON.parse(parsedCookies().locale));
      }
    });
  }, [currency, currencyNeeded, getUser]);

  //
  useEffect(() => {
    if (user && user?.currency) {
      setCurrency(user.currency);
    }
  }, [user]);

  useEffect(() => {
    if (!user || !user.aliases || !user.aliases.length) return;
    getNotifications(user.aliases[0]).then((notifications) => {
      setNotifications(notifications);
    });
  }, [user, getNotifications]);
  const SwitchRoutes = (
    <Switch>
      <Route
        path="/betathankyou"
        exact
        render={(props) => {
          return (
            <div>
              <ThankYou />
            </div>
          );
        }}
      />

      <Route
        path="/demo"
        exact
        render={(props) => {
          return (
            <div>
              <HomePage />
            </div>
          );
        }}
      />

      <Route
        path="/demo/wishlist"
        render={(props) => {
          return (
            <div>
              <WishlistPage user={user} />
            </div>
          );
        }}
      />

      <Route
        path="/stripe_instructions"
        render={(props) => {
          return <StripeInstructions></StripeInstructions>;
        }}
      />
      <Route
        path="/redirecting"
        render={(props) => {
          return <h1>Redirecting...</h1>;
        }}
      />

      <Route
        path="/"
        exact
        render={(props) => {
          return (
            <div>
              <LandingPage signUp={true} />
            </div>
          );
        }}
      />
      <Route
        path="/secret-door"
        exact
        render={(props) => {
          return (
            <div>
              <LandingPage signUp={true} />
            </div>
          );
        }}
      />

      <Route path="/extension" exact>
        <Extension />
      </Route>
      <Route path="/sign-up" exact>
        <SignUp />
      </Route>
      {/* <Route path="/email" exact>
        <UpdateEmail />
      </Route> */}
      <Route path="/wishlist-setup">
        <SetUp />
      </Route>
      <Route
        path="/order"
        render={(props) => {
          return <CheckOutSuccess />;
        }}
      />
      <Route path="/login">
        <Login />
      </Route>
      {/* <Route path="/logout">
        <Logout />
      </Route> */}
      {/* <Route path="/test">
        <Test />
      </Route> */}
      <Route
        path="/cart"
        render={(props) => {
          return <Cart cart={props?.location?.props?.cart} />;
        }}
      />

      <Route path="/request-password-reset">
        {user ? <SendResetPassword></SendResetPassword> : <ForgotPassword />}
      </Route>

      <Route path="/reset-password">
        <ResetPassword />
      </Route>

      <Route
        path="/connect-success"
        exact
        render={(props) => {
          return (
            <div>
              <ConnectSuccess />
            </div>
          );
        }}
      />
      <Route
        path="/wish-tracker"
        render={(props) => {
          return <>{user ? <WishTracker /> : <Login />}</>;
        }}
      />
      <Route
        path="/admin"
        render={(props) => {
          return <>{user.admin ? <Dashboard /> : "Not authorized"}</>;
        }}
      />
      <Route path="/confirmation-email">
        <ConfirmationEmail />
      </Route>
      <Route path="/confirm-email">
        <ConfirmEmail />
      </Route>
      <Route path="/account-settings">
        <AccountSettings />
      </Route>

      <Route path="/:alias">
        <WishlistPage />
      </Route>
    </Switch>
  );
  const routesArray = SwitchRoutes.props.children.map(
    (child) => child.props.path
  );
  routesArray.push(
    routesArray.splice(
      routesArray.findIndex((r) => r === "/"),
      1
    )[0]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          {/* <Switch> */}
          {/* needs to render differently if not accessed from redirect */}
          {user !== undefined && (
            <LocaleContext.Provider
              value={cookies.locale ? JSON.parse(cookies.locale).locale : "en"}
            >
              <CountryContext.Provider
                value={
                  cookies.locale ? JSON.parse(cookies.locale).countryCode : "US"
                }
              >
                <CurrencyContext.Provider
                  value={{
                    currency,
                    currencyList,
                    setCurrency,
                    setCurrencyNeeded,
                    getCurrencyCookie,
                    setCurrencyCookie,
                    setCurrencyCookieAndContext,
                  }}
                >
                  <UserContext.Provider value={{ user, setUser, getUser }}>
                    <NotificationContext.Provider
                      value={{
                        notifications,
                        setNotifications,
                        getNotifications,
                      }}
                    >
                      <RouteContext.Provider
                        value={{
                          isCurrentUsersProfile,
                          setIsCurrentUsersProfile,
                          allRoutes: routesArray,
                        }}
                      >
                        {currencyNeeded && (
                          <StyledDialog
                            noClose={true}
                            open={currencyNeeded}
                            onClose={() => {
                              setCurrencyNeeded(false);
                              if (!currency) {
                                setCurrencyCookie("noConversion");
                              }
                            }}
                          >
                            <SelectCurrencyForm
                              onClose={() => {
                                setCurrencyNeeded(false);
                                if (!currency) {
                                  setCurrencyCookie("noConversion");
                                }
                              }}
                              currencies={currencyList}
                            />
                          </StyledDialog>
                        )}
                        <div
                          style={{
                            minHeight: "calc(100vh - 72px)",
                            position: "relative",

                            // start too low without this???
                            // border: ".2px solid #9990",
                            // height: "100%",
                          }}
                        >
                          <Switch>
                            {/* <Route path="/" exact>
                            <LandingPageMenu />
                          </Route> */}
                            <Route path="/">
                              <Menu />
                            </Route>
                          </Switch>
                          {SwitchRoutes}
                        </div>
                        <Footer></Footer>
                      </RouteContext.Provider>
                    </NotificationContext.Provider>
                  </UserContext.Provider>
                </CurrencyContext.Provider>
              </CountryContext.Provider>
            </LocaleContext.Provider>
          )}
          {/* </Switch> */}
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
