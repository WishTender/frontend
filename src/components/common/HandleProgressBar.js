import React from "react";
import { FormHelperText, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => {
  return {
    progressError: {
      "& .MuiLinearProgress-bar": { backgroundColor: theme.palette.error.main },
    },
    progressSuccess: {
      "& .MuiLinearProgress-bar": { backgroundColor: "greenyellow" },
    },
  };
});
export default function HandleProgressBar(props) {
  const { handleStatus, errors, handle } = props;
  const classes = useStyles(props);
  return (
    <FormHelperText id="handle-helper-text">
      <LinearProgress
        className={
          handleStatus === "unavailable"
            ? classes.progressError
            : handleStatus === "available"
            ? classes.progressSuccess
            : ""
        }
        color={handleStatus === "loading" ? "secondary" : "primary"}
        variant={handleStatus === "loading" ? "indeterminate" : "determinate"}
        value={100}
      />
      {errors.handle?.message ||
        `www.wishtender.com/${
          handle || props.handle ? handle || props.handle : "handle"
        }`}{" "}
      <div style={{ display: "inline", float: "right" }}>
        {handleStatus === "available"
          ? "Available"
          : handleStatus === "loading"
          ? "Checking availability..."
          : handleStatus === "unavailable"
          ? "Unavailable"
          : ""}
      </div>
    </FormHelperText>
  );
}
