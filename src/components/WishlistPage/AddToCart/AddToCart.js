import React, { useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { fetchPatchJson } from "../../../scripts/fetchHelper";
import { Redirect } from "react-router-dom";
import StyledDialog from "../../common/StyledDialog/StyledDialog";
import StyledDialog1 from "../../common/StyledDialog/StyledDialog1";

export default function AddToCart(props) {
  const [cart, setCart] = useState(false);
  const handleClickAddAndShop = () => {
    fetchPatchJson(
      { itemId: props.item._id },
      process.env.REACT_APP_BASE_URL + "/api/cart/add-to-cart",
      console.log
    );
    props.onClose();
  };
  const handleClickAddAndCheckOut = () => {
    fetchPatchJson(
      { itemId: props.item._id },
      process.env.REACT_APP_BASE_URL + "/api/cart/add-to-cart",
      setCart
    );
  };
  return (
    // <StyledDialog1
    //   background="url(/images/background_bow_confetti-sm_optimized.png)"
    //   background_xs="url(/images/background_bow_confetti_xs_optimized.png)"
    //   onClose={props.onClose}
    //   open={props.open}
    // >
    // <StyledDialog
    //   background="url(/images/background_bow_confetti-sm_optimized.png)"
    //   background_xs="url(/images/background_bow_confetti_xs_optimized.png)"
    //   onClose={props.onClose}
    //   open={props.open}
    // >
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      alignItems="center"
      justifyContent="center"
      style={{
        gap: "14px",
        width: "90%",
        margin: "auto",
        // background: "url(/images/background_bow_confetti.png)",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "-80px",
        maxHeight: "80%",
      }}
    >
      {cart && <Redirect to={{ pathname: `/cart`, props: { cart: cart } }} />}
      <Typography color="primary" variant="h5">
        Add To Cart
      </Typography>
      <img
        style={{
          width: "50%",
          boxShadow: "20px 20px 30px grey",
          borderRadius: "4px",
          margin: "20px",
        }}
        src={props.item.itemImage}
        alt="wish item"
      ></img>
      <Button
        // disableElevation={true}
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickAddAndShop}
      >
        Add To Cart and Keep Shopping
      </Button>
      <Button
        // disableElevation={true}
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleClickAddAndCheckOut}
      >
        Add To Cart and Check Out
      </Button>
    </Box>
    // {/* </StyledDialog>
    // </StyledDialog1> */}
  );
}
