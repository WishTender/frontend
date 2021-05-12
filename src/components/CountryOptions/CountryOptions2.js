import React, { useContext } from "react";
import { CountryContext } from "../../contexts/CountryContext";
import supportedPayoutCountries from "./supportedCountryList";

import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-displaynames/locale-data/en";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
export default function CountryOptions() {
  const clientCountry = useContext(CountryContext);

  const countrySelection = supportedPayoutCountries.map((country) =>
    clientCountry === country ? (
      <option selected value={country}>
        {regionNames?.of(country) || country}
      </option>
    ) : (
      <option value={country}>{regionNames?.of(country) || country}</option>
    )
  );

  return <>{countrySelection}</>;
}
