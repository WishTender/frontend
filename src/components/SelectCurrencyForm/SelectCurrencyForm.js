import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Typography } from "@material-ui/core";

import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

function CurrencyOptions(props) {
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
      {cur.name}
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
  return (
    <FormControl
      style={{
        minWidth: 220,
        width: 220,
      }}
    >
      <InputLabel>Select your Preferred Currency</InputLabel>
      <Controller
        control={props.control}
        name={props.name}
        defaultValue={props.currencies[0].code}
        as={
          <Select labelId={props.labelId} id={props.id} name={props.name}>
            {currencySelection}
          </Select>
        }
      />
    </FormControl>
  );
}

export default function SelectCurrencyForm(props) {
  const { register, handleSubmit, error, control } = useForm();
  const setCurrency = (data) => {
    document.cookie = `currency= ${data.currency}`;
    props.onClose();
  };
  return (
    <>
      {props.currencies.length && (
        <form onSubmit={handleSubmit(setCurrency)}>
          <CurrencyOptions
            name="currency"
            control={control}
            currencies={props.currencies}
          />
          <Button type="submit" color="primary" variant="contained">
            Set Currency
          </Button>
        </form>
      )}
    </>
  );
}
