import React from "react";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Typography, DialogTitle, Box } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  title: {
    padding: "0 0 40px 0",
    "& h2.MuiTypography-root": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
  },

  titleText: { position: "relative", paddingTop: theme.spacing(1) },
}));

export default function DialogTitleSection(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.title}>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={props.onClose}
        >
          <CloseIcon color="primary" />
        </IconButton>
      </div>

      <Box display="flex" justifyContent="center">
        <Typography className={classes.titleText} variant="h6" color="primary">
          {props.children}
        </Typography>
      </Box>
    </>
  );
}
