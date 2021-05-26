import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Grid,
  Typography,
  InputLabel,
  Box,
  Switch,
  FormGroup,
} from "@material-ui/core";
import currenciesArray from "./currenciesMenuArray";
import {
  FormControl,
  FormControlLabel,
  FormInputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
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
  const { register, handleSubmit, error, control } = useForm();
  const [checked, setChecked] = useState(true);
  const { setCurrencyCookie, setCurrency, setCurrencyCookieAndContext } =
    useContext(CurrencyContext);
  const submit = (data) => {
    if (!checked) {
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
        <ResponsiveForm onSubmit={handleSubmit(submit)}>
          <Typography variant="h5">
            To Continue Please Select Currency
          </Typography>

          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item style={checked ? { color: "grey" } : {}}>
              Leave prices as listed.
            </Grid>
            <Grid item>
              <Switch
                checked={checked}
                onChange={() => {
                  setChecked(!checked);
                }}
                name="checkedB"
                color="secondary"
              ></Switch>
            </Grid>
            <Grid style={!checked ? { color: "grey" } : {}} item>
              Convert prices
            </Grid>
          </Grid>

          <CurrencyOptions
            disabled={!checked}
            name="currency"
            control={control}
            currencies={props.currencies}
          />
          <Typography variant="body2">
            These settings can be changed in the menu bar at anytime.
          </Typography>
          <ResponsiveFormButton>Set Currency</ResponsiveFormButton>
        </ResponsiveForm>
      )}
    </>
  );
}
