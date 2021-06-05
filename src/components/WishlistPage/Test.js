import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import SelectCropUpdateImage from "./ProfileSection/SelectCropUpdateImage/SelectCropUpdateImage";
import {
  Button,
  Container,
  TextField,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PriceInput from "./PriceInput";
import { fetchPatchMulti, fetchDelete } from "../../scripts/fetchHelper";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import theme from "../../theme";
import themeStyles from "../../themeStyles";
import useScreenSize from "../../hooks/useScreenSize";
import {
  toSmallestUnit,
  currencyInfo,
  isValidPrice,
} from "../../scripts/helpers";
import DialogClose from "../common/StyledDialog/TopSections/TopSection/DialogClose";
import ResponsiveDialogTitleSection from "../common/StyledDialog/TopSections/ResponsiveTopTitleSection/ResponsiveDialogCloseAndTitleSection";

/**
 * Renders a <WishForm /> component
 * @param  props
 * @param  props.info
 * @param  props.onClose
 **/
export default function EditWishForm(props) {
  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });

  const [price, setPrice] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {});
  const onSubmit = (data) => {
    console.log(data);
  };

  const { ref: priceRef, ...priceReg } = register("price", {
    validate: async (value) => {
      const valid = isValidPrice(value, 2);

      if (errors.price || !valid) setPrice(value);

      return valid || `"${value}" is not a valid price.`;
    },
  });
  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Button
          onClick={() => {
            setValue("price", "7", { shouldValidate: true });
          }}
        >
          SetPrice
        </Button>
        <div>price value: {getValues().price}</div>
        <PriceInput
          price={price}
          setPrice={setPrice}
          onChange={(price) => {
            setPrice(price);
          }}
          register={priceReg}
          inputRef={priceRef}
          error={errors.price?.message}
          symbol={"$"}
          decimalPlaces={2}
        ></PriceInput>

        <div style={{ width: "100%" }}>
          <Button
            id="submit_dialog"
            disableElevation={true}
            // className={props.classes && props.classes.submit_xs}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Update
          </Button>
        </div>
      </form>
    </>
  );
}
