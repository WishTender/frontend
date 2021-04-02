import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { RouteContext } from "./contexts/RouteContext";
import { CurrencyContext } from "./contexts/CurrencyContext";
import { CountryContext } from "./contexts/CountryContext";
import { LocaleContext } from "./contexts/LocaleContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useTraceUpdate from "./scripts/useTraceUpdate";
// import React from 'react';k
// import './App.css';
import {
  clientCurrency,
  parsedCookies,
  chooseCurrency,
} from "./scripts/helpers";
import "./myapp.css";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage/LandingPage";
import ThankYou from "./components/LandingPage/ThankYou";
import CustomizedMenus from "./components/nav/menu.js";
import Image from "./components/common/S3Image/Image";
import Cart from "./components/Cart/Cart.js";
import Login from "./components/Login/Login.js";
import Logout from "./components/nav/LogoutButton/LogoutButton.js";
import WishTracker from "./components/WishTracker/WishTracker.js";
import ConnectSetup from "./components/ConnectSetup/ConnectSetup";
import ConfirmationEmail from "./components/ConfirmationEmail/ConfirmationEmail";
import ConfirmEmail from "./components/ConfirmEmail/ConfirmEmail";

import { ThemeProvider } from "@material-ui/styles";
import WishlistPage from "./components/WishlistPage/WishlistPage";

// import AddWish from "./components/wishlistpage/addwish1/AddWish.js";
import SignUp from "./components/SignUp/SignUp";
import SetUp from "./components/SetUp/SetUp";
// import './Styles/App.css';
import theme from "./theme";
import CheckOutSuccess from "./components/CheckOutSuccess/CheckOutSuccess";
// import WishForm from "./components/wishlistpage/AddWish/WishForm/WishForm";
import ConnectSuccess from "./components/ConnectSuccess/ConnectSucess";

function App(props) {
  const { getUser } = useContext(UserContext);
  const [user, setUser] = useState();
  const [isCurrentUsersProfile, setIsCurrentUsersProfile] = useState();
  const cookies = parsedCookies();
  useTraceUpdate(App.name, props, { user });

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
      if (!clientCurrency(user)) {
        chooseCurrency(JSON.parse(parsedCookies().locale));
      }
    });
  }, [getUser]);
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
        path="/"
        exact
        render={(props) => {
          return (
            <div>
              <LandingPage />
            </div>
          );
        }}
      />
      <Route path="/sign-up" exact>
        <SignUp />
      </Route>
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
      <Route path="/logout">
        <Logout />
      </Route>
      <Route
        path="/cart"
        render={(props) => {
          return <Cart cart={props?.location?.props?.cart} />;
        }}
      />
      <Route
        path="/connect-setup"
        exact
        render={(props) => {
          return (
            <div>
              <ConnectSetup />
            </div>
          );
        }}
      />
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
          return <WishTracker />;
        }}
      />
      <Route path="/confirmation-email">
        <ConfirmationEmail />
      </Route>
      <Route path="/confirm-email">
        <ConfirmEmail />
      </Route>
      <Route path="/image">
        <Image />
      </Route>

      <Route path="/:alias">
        <WishlistPage />;
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
      <div className="App">
        <Router>
          {/* <Switch> */}
          {/* needs to render differently if not accessed from redirect */}
          {user !== undefined && (
            <LocaleContext.Provider value={JSON.parse(cookies.locale).locale}>
              <CountryContext.Provider
                value={JSON.parse(cookies.locale).countryCode}
              >
                <CurrencyContext.Provider value={clientCurrency(user)}>
                  <UserContext.Provider value={{ user, setUser, getUser }}>
                    <RouteContext.Provider
                      value={{
                        isCurrentUsersProfile,
                        setIsCurrentUsersProfile,
                        allRoutes: routesArray,
                      }}
                    >
                      <Switch>
                        {/* <Route path="/" exact>
                          <LandingPageMenu />
                        </Route> */}
                        <Route path="/">
                          <CustomizedMenus />
                        </Route>
                      </Switch>
                      {SwitchRoutes}
                    </RouteContext.Provider>
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
