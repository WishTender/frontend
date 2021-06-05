import React, { useContext } from "react";
import { CountryContext } from "../../contexts/CountryContext";
import supportedPayoutCountries from "./supportedCountryList";
import { Controller } from "react-hook-form";

import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-displaynames/locale-data/en";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export default function CountryOptions(props) {
  const clientCountry = useContext(CountryContext);
  const [country, setCountry] = React.useState(
    supportedPayoutCountries.includes(clientCountry) ? clientCountry : ""
  );

  // this isn't actually doing anything
  // const handleChange = (event) => {
  //   setCountry(event.target.value);
  // };

  const countrySelection = supportedPayoutCountries.map((cntry) => (
    <MenuItem value={cntry}>{regionNames?.of(cntry) || cntry}</MenuItem>
  ));

  return (
    <FormControl
      style={{
        minWidth: 220,
        width: 220,
      }}
    >
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Controller
        control={props.control}
        name={props.name}
        defaultValue={country}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            labelId={props.labelId}
            id={props.id}
            name={props.name}
            // this isn't actually doing anything
            // value={country}
            // onChange={handleChange}
          >
            {countrySelection}
          </Select>
        )}
      />
    </FormControl>
  );
}
