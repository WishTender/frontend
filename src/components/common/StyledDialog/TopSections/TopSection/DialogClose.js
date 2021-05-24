import React from "react";
import { DialogTitle } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  closeButtonV1: {
    position: "absolute",
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
    color: theme.palette.primary.main,
  },
}));
export default function DialogClose(props) {
  const classes = useStyles(props);
  return (
    // <DialogTitle style={props.style}>
    <IconButton
      aria-label="close"
      className={classes.closeButtonV1}
      onClick={props.onClose}
    >
      <CloseIcon />
    </IconButton>
    // {/* </DialogTitle> */}
  );
}
