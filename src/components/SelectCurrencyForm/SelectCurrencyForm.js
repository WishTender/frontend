import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useScreenSize from "../../hooks/useScreenSize";
import theme from "../../theme";

import {
  Grid,
  Typography,
  InputLabel,
  Switch,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import currenciesArray from "./currenciesMenuArray";
import { FormControl, Select } from "@material-ui/core";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import ResponsiveForm from "../common/StyledDialog/ResponsiveForm/ResponsiveForm";
import ResponsiveFormButton from "../common/StyledDialog/ResponsiveForm/ResponsiveFormButton";
function CurrencyOptions(props) {
  const { setCurrencyCookieAndContext, setCurrency } =
    useContext(CurrencyContext);
  return (
    <FormControl
      style={{
        minWidth: 220,
        width: 220,
        textAlign: "left",
      }}
    >
      <InputLabel>Select Your Preferred Currency</InputLabel>
      <Controller
        control={props.control}
        name={props.name}
        disabled={props.disabled || false}
        defaultValue={props.currencies[0].code}
        as={
          <Select
            disabled={props.disabled || false}
            labelId={props.labelId}
            id={props.id}
            name={props.name}
          >
            {currenciesArray({
              currencies: props.currencies,
              onClick: (curCode) => {
                setCurrencyCookieAndContext(curCode, setCurrency);
              },
              disabled: props.disabled,
            })}
          </Select>
        }
      />
    </FormControl>
  );
}

export default function SelectCurrencyForm(props) {
  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });
  const { register, handleSubmit, error, control } = useForm();
  const [convert, setConvert] = useState(true);
  const { setCurrencyCookie, setCurrency, setCurrencyCookieAndContext } =
    useContext(CurrencyContext);
  const submit = (data) => {
    if (!convert) {
      // setCurrencyCookieAndContext("noConversion", setCurrency);
      setCurrencyCookie("noConversion");
    } else {
      setCurrencyCookie(data.currency);
    }
    props.onClose();
  };
  return (
    <>
      {props.currencies.length && (
        <ResponsiveForm onSubmit={handleSubmit(submit)} title="Select Currency">
          <div
            style={{
              // width: "80%",
              display: "flex",
              flexDirection: "column",
              gap: "2em",
              padding:
                screenSize === "xs"
                  ? theme.spacing(6, 0, 1, 0)
                  : theme.spacing(4, 0, 1, 0),
            }}
          >
            {/* <Typography variant="h7">
              To Continue Please Select Currency
            </Typography> */}
            <Typography variant="body2">
              These settings can be changed in the menu bar at anytime.
            </Typography>

            <FormControl>
              <FormLabel>Covert Prices?</FormLabel>
              <RadioGroup
                value={convert ? "convert" : "noConvert"}
                onChange={(e) => {
                  setConvert(
                    e.currentTarget.value === "convert" ? true : false
                  );
                }}
              >
                <FormControlLabel
                  // value={true}
                  value="convert"
                  label={
                    <Typography variant="caption">
                      Yes, convert prices to my currency.
                    </Typography>
                  }
                  control={<Radio></Radio>}
                ></FormControlLabel>
                <FormControlLabel
                  // value={false}
                  value="noConvert"
                  label={
                    <Typography variant="caption">
                      No, leave prices as listed.
                    </Typography>
                  }
                  control={<Radio></Radio>}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>

            <CurrencyOptions
              disabled={!convert}
              name="currency"
              control={control}
              currencies={props.currencies}
            />
          </div>
          <ResponsiveFormButton>Set Currency</ResponsiveFormButton>
        </ResponsiveForm>
      )}
    </>
  );
}
