import React from "react";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Typography, DialogTitle } from "@material-ui/core";
export default function DialogTitleSection(props) {
  return (
    <>
      <DialogTitle className={props.classes.title}>
        <IconButton
          aria-label="close"
          className={props.classes.closeButton}
          onClick={props.onClose}
        >
          <CloseIcon color="primary" />
        </IconButton>
      </DialogTitle>

      <Typography variant="h7" color="primary">
        {props.children}
      </Typography>
    </>
  );
}
