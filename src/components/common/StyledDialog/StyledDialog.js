import React, { cloneElement } from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Container from "@material-ui/core/Container";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const childStyles = makeStyles((theme) => ({
  title: {
    padding: "0 0 40px 0",
    "& h2.MuiTypography-root": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  title_xs: {
    position: "absolute",
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    padding: "0",
    left: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "center",
    width: "100%",
    height: "4em",
    "& h2.MuiTypography-root": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  closeButton: {
    position: "absolute",
    right: "3%",
    top: "3%",
  },
  closeButton_xs: { color: "white" },
  submit: { borderRadius: "0" },
  submit_xs: {
    position: "fixed",
    bottom: "0",
    left: "0",
    height: "4em",
    borderRadius: "0",
    width: "100%",
    fontWeight: "900",
  },
  dialogContent: {},
  dialogContent_xs: {
    top: "20vh",
    position: "relative",
  },
}));
const containerStyles = makeStyles((theme) => ({
  root: {
    width: "400px",
    textAlign: "center",
    [theme.breakpoints.down("450")]: {
      //center
      display: "flex",
      flexDirection: "column",
      //
      height: "100%",
      width: "100%",
    },
  },
}));

/**
 * Renders a <StyledDialog /> component
 * @param  props
 * @param  props.open
 * @param  props.onClose
 * @param  props.ariaLabel
 **/
export default function StyledDialog(props) {
  const dialogStyles = makeStyles((theme) => {
    return {
      root: {
        "& .MuiDialog-container.MuiDialog-scrollBody": {
          display: "flex",
          overflow: "scroll",
        },
        "& .MuiDialog-paper": {
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          background: props.background,
          maxHeight: "80%",
          margin: "auto",
          borderRadius: "6px",
          padding: theme.spacing(5, 1),
          paddingTop: 0,
        },
        [theme.breakpoints.down("450")]: {
          "& .MuiDialog-paper": {
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            background: props.background_xs,

            width: "100%",
            maxHeight: "none",
            height: "100%",
            margin: "auto",
            padding: "0px 0 0 0",
            boxSizing: "border-box",
            maxWidth: "none",
            borderRadius: "0",
            // "& .MuiContainer-root": { padding: 0 },
          },
        },
      },
    };
  });

  const childClasses = childStyles();
  const dialogClasses = dialogStyles();
  const containerClasses = containerStyles();
  const clonedChildren = cloneElement(
    props.children,
    {
      onClose: props.onClose,
      classes: childClasses,
    },
    null
  );

  return (
    <>
      <Dialog
        scroll="body"
        open={props.open}
        onClose={props.onClose} // when you click on the side
        // style={{ background: "url(/images/background_bow_confetti.png)" }}
        aria-label={props.ariaLabel || "dialog"}
        className={dialogClasses.root}
      >
        <Container className={containerClasses.root}>
          {/* {!props.noClose && (
            <MuiDialogTitle>
              <>
                <IconButton
                  aria-label="close"
                  className={buttonClasses.closeButton}
                  onClick={props.onClose}
                >
                  <CloseIcon />
                </IconButton>
              </>
            </MuiDialogTitle>
          )} */}
          {clonedChildren}
        </Container>
      </Dialog>
    </>
  );
}
