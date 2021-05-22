import React from "react";
import useScreenSize from "../../../hooks/useScreenSize";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Typography, DialogTitle } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function DialogTitleSectionXs(props) {
  return (
    <>
      <DialogTitle className={props.classes.title_xs}>
        <IconButton
          aria-label="close"
          className={props.classes.closeButton_xs}
          onClick={props.onClose}
        >
          <ArrowBackIcon color="primary" />
        </IconButton>

        <Typography
          variant="h6"
          className={props.classes.titleText_xs}
          color="primary"
        >
          {props.children}
        </Typography>
        <IconButton
          aria-label="close"
          className={props.classes.closeButton_xs}
          onClick={props.onClose}
        >
          <CloseIcon color="primary" />
        </IconButton>
      </DialogTitle>
    </>
  );
}
