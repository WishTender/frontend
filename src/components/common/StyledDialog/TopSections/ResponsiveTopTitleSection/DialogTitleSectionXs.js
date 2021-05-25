import React from "react";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Typography, DialogTitle } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  title_xs: {
    position: "relative",
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

  closeButton_xs: { color: "white" },

  titleText_xs: { position: "relative" },
}));
export default function DialogTitleSectionXs(props) {
  const classes = useStyles();

  return (
    <>
      <DialogTitle className={classes.title_xs}>
        <IconButton
          aria-label="close"
          className={classes.closeButton_xs}
          onClick={props.onClose}
        >
          <ArrowBackIcon color="primary" />
        </IconButton>

        <Typography
          variant="h6"
          className={classes.titleText_xs}
          color="primary"
        >
          {props.children}
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton_xs}
          onClick={props.onClose}
        >
          <CloseIcon color="primary" />
        </IconButton>
      </DialogTitle>
    </>
  );
}
