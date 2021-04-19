import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SelectCropUpdateImage from "../ProfileSection/SelectCropUpdateImage/SelectCropUpdateImage";
import {
  Button,
  Container,
  TextField,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PriceInput from "../PriceInput";
import { fetchPatchMulti, fetchDelete } from "../../../scripts/fetchHelper";
import StyledDialog from "../../common/StyledDialog/StyledDialog";

import {
  toSmallestUnit,
  currencyInfo,
  isValidPrice,
} from "../../../scripts/helpers";

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
 **/
export default function EditWishForm(props) {
  const classes = useStyles();
  const [price, setPrice] = useState("");
  const [itemName, setItemName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [deleteWarningVisible, setDeleteWarningVisible] = useState(false);

  useEffect(() => {
    setItemName(props.info && props.info.itemName);
    setPrice(props.info && props.info.price);
  }, [props.info]);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    if (imageFile) data.image = imageFile;

    Object.keys(data).forEach((value) => {
      if (
        (value === "price" && +data[value] === +props.info[value]) ||
        !data[value] ||
        data[value] === props.info[value]
      ) {
        delete data[value];
      }
    });
    if (data.price)
      data.price = toSmallestUnit(data.price, props.info.currency);
    if (Object.keys(data).length) {
      fetchPatchMulti(
        data,
        `${process.env.REACT_APP_BASE_URL}/api/wishlistItems/${props.id}`,
        () => {
          props.onClose({ refresh: true });
        }
      );
    } else {
      props.onClose({ refresh: false });
    }
  };
  const handleImageUpdate = (img) => {
    setImageFile(img);
  };
  const deleteWish = () => {
    fetchDelete(
      `${process.env.REACT_APP_BASE_URL}/api/wishlistItems/${props.id}`,
      () => props.onClose({ refresh: true })
    );
  };
  return (
    <form
      autoComplete="off"
      style={props.disabled ? { opacity: ".3", pointerEvents: "none" } : {}}
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Container>
        <img
          src={
            // should we URL.revokeObjectURL();?

            imageFile ? URL.createObjectURL(imageFile) : props.info.itemImage
          }
          alt="product"
        />

        <SelectCropUpdateImage
          aspect={1}
          cropShape="rect"
          finalImageDimensions={{ width: 300, height: 300 }}
          handleUpdateImage={handleImageUpdate}
        >
          <p style={{ textDecoration: "underline", fontSize: ".8em" }}>
            Upload Custom Photo
          </p>
        </SelectCropUpdateImage>
      </Container>
      <Typography>Edit Wish Info</Typography>
      <FormControl error={errors.itemName ? true : false}>
        <TextField
          inputRef={register({
            maxLength: {
              value: 199,
              message: "Product name must be less than 200 characters",
            },
            minLength: {
              value: 5,
              message: "Product name must be more than 4 characters",
            },
          })}
          name="itemName"
          variant="outlined"
          value={itemName}
          label="Product Name"
          onChange={(e) => {
            setItemName(e.target.value);
          }}
        />
        <FormHelperText>{errors.itemName?.message}</FormHelperText>
      </FormControl>

      <PriceInput
        price={price}
        setPrice={setPrice}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        inputRef={register({
          validate: async (value) => {
            console.log(
              "validation change from ",
              price,
              value,
              isValidPrice(value)
            );

            const currency = currencyInfo(props.info.currency);

            const valid = isValidPrice(value, currency.decimalPlaces);

            if (errors.price || !valid) setPrice(value);

            return valid || `${value} is not a valid price.`;
          },
        })}
        error={errors.price?.message}
        symbol={currencyInfo(props.info.currency).symbol}
      ></PriceInput>

      <Grid container justify="flex-end">
        <StyledDialog
          open={deleteWarningVisible}
          onClose={() => setDeleteWarningVisible(false)}
        >
          <p>Are you sure you want to delete this wish?</p>
          <Button onClick={() => setDeleteWarningVisible(false)}>No</Button>
          <Button
            onClick={() => {
              setDeleteWarningVisible(false);
              deleteWish();
            }}
          >
            Yes
          </Button>
        </StyledDialog>
        <Button size="small" onClick={() => setDeleteWarningVisible(true)}>
          Delete Wish
        </Button>
      </Grid>

      <Button
        disableElevation={true}
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
      >
        Update
      </Button>
    </form>
  );
}
