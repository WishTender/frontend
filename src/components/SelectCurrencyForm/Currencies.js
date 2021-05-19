import React from "react";
import { MenuItem, Typography } from "@material-ui/core";

export default function Currencies(props) {
  let currencySelection = props.currencies.map((cur, i) => (
    <MenuItem
      style={
        cur.match && !props.currencies[i + 1].match
          ? { borderBottom: "1px solid grey" }
          : {}
      }
      label="Enable secondary text"
      value={cur.code}
    >
      <Typography
        display="inline"
        style={{
          fontWeight: "900",
          color: cur.code === "noConversion" ? "grey" : "limegreen",
          paddingRight: "8px",
        }}
      >
        {cur.symbol}
      </Typography>
      {cur.name}{" "}
      <Typography
        display="inline"
        style={{
          fontSize: ".8em",
          fontWeight: "900",
          color: "lightgrey",
          paddingLeft: "8px",
        }}
      >
        {cur.code}
      </Typography>
    </MenuItem>
  ));
  if (props.currencies[0].match) {
    currencySelection = [
      <Typography variant="caption" style={{ padding: "8px" }}>
        Detected Currency Preferences
      </Typography>,
      ...currencySelection,
    ];
  }
  return currencySelection;
}
