import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChooseImage from "../ChooseImage";
import PriceInput from "../../PriceInput";
import EditWishFormtest from "../../EditWishForm/EditWishFormtest";
import { CurrencyContext } from "../../../../contexts/CurrencyContext";

import {
  getSymbol,
  isValidPrice,
  toCurrencyDecimals,
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
  const clientCurrency = useContext(CurrencyContext);

  useEffect(() => {
    setName(props.info && props.info.title);
    setPrice(props.info && props.info.price);
  }, [props.info]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    //send data to backend post wish item
    data.imageCrop = crop;
    props.onSubmit(data);
  };
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
        price={props.info.price}
        // price={price}
        setPrice={setPrice}
        inputRef={register({
          validate: (value) => {
            console.log(
              "validation change from ",
              price,
              value,
              isValidPrice(value)
            );
            const valid = isValidPrice(value);

            return valid || `${value} is not a valid price.`;
          },
        })}
        error={errors.price?.message}
        symbol={getSymbol("USD")}
      ></PriceInput>

      {!props.disabled && (
        <EditWishFormtest
          info={{
            price: props.info.price,
            itemName: props.info.itemName,
            itemImage: props.info.itemImage,
            currency: props.info.currency,
          }}
          id={props.info._id}
          onClose={() => {
            console.log("hi");
          }}
        />
      )}

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
