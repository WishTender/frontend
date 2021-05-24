import React, { cloneElement } from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Container from "@material-ui/core/Container";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const containerStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
          // paddingTop: 0,
        },
        [theme.breakpoints.down(props.mobileBreakPoint || "450")]: {
          "& .MuiDialog-paper": {
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            background: props.background_xs,

            width: "100%",
            maxHeight: "none",
            height: "100%",
            margin: "auto",
            boxSizing: "border-box",
            maxWidth: "none",
            borderRadius: "0",
            // "& .MuiContainer-root": { padding: 0 },
          },
        },
      },
    };
  });

  // const childClasses = childStyles();
  const dialogClasses = dialogStyles();
  const containerClasses = containerStyles();
  // const clonedChildren = cloneElement(
  //   props.children,
  //   {
  //     onClose: props.onClose,
  //     classes: childClasses,
  //   },
  //   null
  // );

  return (
    <>
      <Dialog
        scroll="body"
        open={props.open}
        onClose={props.onClose} // when you click on the side
        aria-label={props.ariaLabel || "dialog"}
        className={dialogClasses.root}
      >
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          className={containerClasses.root}
        >
          {props.children}
        </Box>
      </Dialog>
    </>
  );
}
