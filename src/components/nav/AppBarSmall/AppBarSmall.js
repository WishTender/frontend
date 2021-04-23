import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import { UserContext } from "../../../contexts/UserContext";
import LogoutButton from "../LogoutButton/LogoutButton";
import SignupButton from "../SignupButton/SignupButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";

// app bar
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountTabs from "../AccountTabs/AccountTabs";
import "./AppBarSmall.css";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 900,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const appBarStyles = makeStyles((theme) => ({
  root: {
    border: "3px solid red",

    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 900,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        className={`back_to_top ${classes.root}`}
      >
        {children}
      </div>
    </Zoom>
  );
}

export default function BackToTop(props) {
  const { user } = useContext(UserContext);

  const [scrolledStyle, setscrolledStyle] = useState("noShadow");

  const listenScrollEvent = (event) => {
    if (window.scrollY < 70) {
      return setscrolledStyle("noShadow");
    } else if (window.scrollY >= 70) {
      return setscrolledStyle("shadow");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  const classes = useStyles();
  const ShoppingCartButton = (
    <IconButton component={Link} to="/cart" color="primary">
      <ShoppingCartIcon></ShoppingCartIcon>
    </IconButton>
  );
  return (
    <React.Fragment>
      {/* app bar */}
      <AppBar className={scrolledStyle}>
        <Toolbar style={{ width: "100%", height: "100%" }}>
          {props.screen === "xs" && (
            <IconButton
              onClick={props.openMenu}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}

          <div className="logo container">
            <a href="/">
              <img
                alt="WishTender logo"
                className="logo"
                src={
                  props.screen === "xs"
                    ? "/images/icon_logo.png"
                    : "/images/logo.png"
                }
                style={
                  props.screen === "xs"
                    ? {
                        maxHeight: "35px",
                        maxWidth: "100%",
                        top: "-3px",
                        position: "relative",
                      }
                    : {
                        maxHeight: "68px",
                        maxWidth: "100%",
                        top: "-3px",
                        position: "relative",
                      }
                }
              />
            </a>
          </div>
          {!user ? (
            props.screen !== "xs" ? (
              <>
                {ShoppingCartButton}
                <Button
                  component={Link}
                  to="/login"
                  color="primary"
                  href="/login"
                >
                  Login
                </Button>
                <SignupButton />
              </>
            ) : (
              <> {ShoppingCartButton}</>
            )
          ) : (
            <>
              <AccountTabs screen={props.screen} />
              {ShoppingCartButton}
              {props.screen !== "xs" && (
                <>
                  <LogoutButton />
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      <div id="back-to-top-anchor" />
      {/* appbar end */}
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
