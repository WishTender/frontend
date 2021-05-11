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

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const countrySelection = supportedPayoutCountries.map((cntry) =>
    clientCountry === cntry ? (
      <MenuItem value={cntry}>{regionNames?.of(cntry) || cntry}</MenuItem>
    ) : (
      <MenuItem value={cntry}>{regionNames?.of(cntry) || cntry}</MenuItem>
    )
  );

  return (
    <FormControl
      style={{
        // margin: theme.spacing(1),
        minWidth: 220,
      }}
    >
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Controller
        control={props.control}
        name={props.name}
        inputRef={props.inputRef}
        as={
          <Select
            labelId={props.labelId}
            id={props.id}
            value={country}
            onChange={handleChange}
            defaultValue={country}
          >
            {countrySelection}
          </Select>
        }
      />
    </FormControl>
  );
}
