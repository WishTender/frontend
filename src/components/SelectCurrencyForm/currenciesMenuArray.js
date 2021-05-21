import React from "react";
import { MenuItem, Typography } from "@material-ui/core";

export default function currenciesMenuItemArray(options) {
  let currencySelection = options.currencies.map((cur, i) => (
    <MenuItem
      onClick={options.onClick ? () => options.onClick(cur.code) : null}
      style={
        cur.match && !options.currencies[i + 1].match
          ? { borderBottom: "1px solid grey" }
          : {}
      }
      selected={cur.code === options.currency}
      label="Enable secondary text"
      value={cur.code}
    >
      <Typography
        display="inline"
        style={{
          fontWeight: "900",
          color:
            cur.code === "noConversion" || options.disabled
              ? "grey"
              : "limegreen",
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
        {cur.code !== "noConversion" && cur.code}
      </Typography>
    </MenuItem>
  ));
  if (options.currencies[0].match) {
    currencySelection = [
      <Typography variant="caption" style={{ padding: "8px" }}>
        Detected Currency Preferences
      </Typography>,
      ...currencySelection,
    ];
  }
  return currencySelection;
}
