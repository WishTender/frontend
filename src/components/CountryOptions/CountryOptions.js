import React, { useContext } from "react";
import { CountryContext } from "../../contexts/CountryContext";

import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-displaynames/locale-data/en";

const supportedPayoutCountries = [
  "AU",
  "AT",
  "BE",
  "BG",
  "CA",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HK",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "NZ",
  "NO",
  "PL",
  "PT",
  "RO",
  "SG",
  "SK",
  "SI",
  "ES",
  "SE",
  "CH",
  "GB",
  "US",
];

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
