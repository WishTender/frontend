import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import Help from "@material-ui/icons/Help";

const useStyles = makeStyles((theme) => {
  return {
    est: { color: theme.palette.error[300] },
  };
});

export default function ConvertedPrice({ formattedPrice }) {
  const classes = useStyles();
  return (
    <Tooltip
      title={`estimated conversion from ${formattedPrice.displayWithFee}`}
    >
      <div>
        <span className={classes.est}>est.</span>
        {formattedPrice.convertedWithFee}
        <Help color="error" style={{ fontSize: "15" }} />
      </div>
    </Tooltip>
  );
}
