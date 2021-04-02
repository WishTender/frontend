import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { fetchPostJson } from "../../../scripts/fetchHelper";
import { Redirect } from "react-router-dom";

export default function AddToCart(props) {
  const [cart, setCart] = useState(false);
  const handleClickAddAndShop = () => {
    fetchPostJson(
      { itemId: props.item._id },
      "/api/cart/add-to-cart",
      console.log
    );
    props.onClose();
  };
  const handleClickAddAndCheckOut = () => {
    fetchPostJson({ itemId: props.item._id }, "/api/cart/add-to-cart", setCart);
  };
  return (
    <div>
      {cart && <Redirect to={{ pathname: `/cart`, props: { cart: cart } }} />}
      add to cart
      <img src={props.item.itemImage} alt="wish item"></img>
      <Button
        disableElevation={true}
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickAddAndShop}
      >
        Add To Cart and Keep Shopping
      </Button>
      <Button
        disableElevation={true}
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickAddAndCheckOut}
      >
        Add To Cart and Check Out
      </Button>
    </div>
  );
}
