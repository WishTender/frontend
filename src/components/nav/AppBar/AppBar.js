import React, { useState, useContext, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AccountIcon from "@material-ui/icons/AccountBox";
import PopUpMenu from "../../common/PopUpMenu/PopUpMenu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import { UserContext } from "../../../contexts/UserContext";
import LogoutButton from "../LogoutButton/LogoutButton";
import SignupButton from "../SignupButton/SignupButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import Tooltip from "@material-ui/core/Tooltip";

// app bar
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountTabs from "../AccountTabs/AccountTabs";
import "./AppBar.css";
import useCustomStyles from "../../../themeStyles";
import { MenuItem } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 900,
  },
  doubleIconButton: {
    "&:hover": { background: "none" },
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

function ScrollTop(props) {
  const { children } = props;
  const classes = useCustomStyles(props);
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

function BackToTop(props) {
  const { user } = useContext(UserContext);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const [scrolledStyle, setscrolledStyle] = useState("noShadow");
  const toggleMenu = (event) => {
    if (menuAnchor) {
      setMenuAnchor(null);
    } else {
      setMenuAnchor(event.currentTarget);
    }
  };

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
  const classes = useCustomStyles(props);
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
                  className={classes.margin}
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
              {/* {ShoppingCartButton} */}
              {props.screen !== "xs" && (
                <>
                  <Tooltip title="Account" aria-label="account">
                    <IconButton
                      className={classes.doubleIconButton}
                      onClick={toggleMenu}
                      aria-label="logout"
                    >
                      <AccountIcon />
                      <ExpandMoreIcon />
                    </IconButton>
                  </Tooltip>
                  <PopUpMenu
                    onClose={() => setMenuAnchor(null)}
                    anchorEl={menuAnchor}
                    open={menuAnchor}
                  >
                    <MenuItem
                      component={Link}
                      to="/account-settings"
                      color="primary"
                      href="/account-settings"
                      onClick={() => setMenuAnchor(null)}
                    >
                      Account Settings
                    </MenuItem>
                    <LogoutButton>
                      <MenuItem onClick={() => setMenuAnchor(null)}>
                        Log out
                      </MenuItem>
                    </LogoutButton>
                  </PopUpMenu>
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
export default withStyles(styles)(BackToTop);
