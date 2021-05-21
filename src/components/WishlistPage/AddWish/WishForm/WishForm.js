import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChooseImage from "../ChooseImage";
import PriceInput from "../../PriceInput";
import { CurrencyContext } from "../../../../contexts/CurrencyContext";
import {
  isValidPrice,
  currencyInfo,
  toSmallestUnit,
} from "../../../../scripts/helpers";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "grid",
      gap: "1em",
    },
    button: {
      fontWeight: 900,
      color: "white",
      borderRadius: 0,
      [theme.breakpoints.down(450)]: {
        position: "fixed",
        left: "0",
        bottom: 0,
        width: "100%",
        zIndex: 10,
      },
    },
  };
});

/**
 * Renders a <WishForm /> component
 * @param  props
 * @param  props.info
 * @param  props.onClose
 * @param  props.disabled
 * @param  props.images
 **/
export default function WishForm(props) {
  const classes = useStyles();
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [crop, setCrop] = useState("");
  const { currency: clientCurrency } = useContext(CurrencyContext);

  useEffect(() => {
    setName(props.info && props.info.title);
    setPrice(props.info && props.info.price);
  }, [props.info]);
  useEffect(() => {
    console.log(price);
  }, [price]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    //send data to backend post wish item
    data.price = toSmallestUnit(data.price, clientCurrency);
    data.imageCrop = crop;
    props.onSubmit(data);
  };
  console.log("props.price, ", props.info.price);
  return (
    <form
      style={props.disabled ? { opacity: ".3", pointerEvents: "none" } : {}}
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ChooseImage onImageChosen={setCrop} images={props.images} />
      <Typography>Set Wish Info</Typography>
      <TextField
        inputRef={register()}
        name="itemName"
        variant="outlined"
        value={name}
        label="Product Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <PriceInput
        price={price}
        setPrice={setPrice}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        inputRef={register({
          validate: (value) => {
            console.log(
              "validation change from ",
              price,
              value,
              isValidPrice(value)
            );

            const currency = currencyInfo(clientCurrency);

            const valid = isValidPrice(value, currency.decimalPlaces);

            if (errors.price || !valid) setPrice(value);

            return valid || `${value} is not a valid price.`;
          },
        })}
        error={errors.price?.message}
        symbol={currencyInfo(clientCurrency).symbol}
      ></PriceInput>
      <Button
        disableElevation={true}
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
      >
        + Add Wish
      </Button>
    </form>
  );
}
