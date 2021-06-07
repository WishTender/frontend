import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    // margin: theme.spacing(1),
    position: "relative",
    display: "flex",
    alignItems: "stretch",
    flexDirection: "column",
  },
  success: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  error: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  buttonProgress: {
    color: green[400],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ProgressButton(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.wrapper + " " + props.wrapperClassName}>
      <Button
        {...props}
        disabled={props.loading || props.disabled}
        color="primary"
        className={
          (props.success
            ? classes.success
            : props.error
            ? classes.error
            : " ") +
          " " +
          classes.button +
          " " +
          props.className
        }
        variant="contained"
        value="Login"
        endIcon={(props.success && <CheckCircleIcon />) || props.endIcon}
      >
        {props.success
          ? props.successMessage || "Success"
          : props.error
          ? props.errorMessage || "Retry"
          : props.children}
      </Button>
      {props.loading && (
        <CircularProgress
          size={24}
          className={classes.buttonProgress}
        ></CircularProgress>
      )}
    </div>
  );
}
