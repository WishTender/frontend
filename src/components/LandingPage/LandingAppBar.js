import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";

// app bar
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

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

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    // target: window ? window() : undefined, //dashie commented this out because of the above comment
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

  return (
    <React.Fragment>
      <CssBaseline />
      {/* app bar */}
      <AppBar className={scrolledStyle}>
        <Toolbar style={{ width: "100%", height: "100%" }}>
          <div className="logo container">
            <a href="/">
              <img
                alt="logo"
                className="logo"
                src="/images/logo.png"
                style={{ height: "68px", top: "-3px", position: "relative" }}
              />
            </a>
          </div>
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
