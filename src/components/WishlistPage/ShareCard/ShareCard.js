import React, { useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { fetchPatchJson } from "../../../scripts/fetchHelper";
import { Redirect } from "react-router-dom";
import StyledDialog from "../../common/StyledDialog/StyledDialog";
import DialogClose from "../../common/StyledDialog/TopSections/TopSection/DialogClose";
import theme from "../../../theme";
import useScreenSize from "../../../hooks/useScreenSize";
import DisplayPrice2 from "../../common/DisplayPrice2";
export default function ShareCard(props) {
  const [cart, setCart] = useState(false);
  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });
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
    <>
      {/* <DialogClose onClose={props.onClose} /> */}
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        alignItems="center"
        justifyContent="center"
        style={{
          gap: "14px",
          width: 800,
          height: 400,
          background: "url(/images/background_bow_confetti-sm_optimized.png)",
          // background: "url(/images/background_bow_confetti.png)",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "-20px",
          backgroundPositionX: "0px",

          maxHeight: "80%",
          padding:
            screenSize === "xs"
              ? theme.spacing(5, 0, 0, 0)
              : theme.spacing(6, 2, 6, 2),
        }}
      >
        {cart && <Redirect to={{ pathname: `/cart`, props: { cart: cart } }} />}
        {/* <Typography color="primary" variant="h5">
          Add To Cart
        </Typography> */}
        <img
          style={{
            width: "30%",
            boxShadow: "20px 20px 30px grey",
            borderRadius: "4px",
            margin: "20px",
          }}
          src={props.item.itemImage}
          alt="wish item"
        ></img>
        <Typography
          style={{
            maxWidth: "300px",
            textAlign: "center",
            color: "rgba(0, 0, 0, 0.54)",
          }}
        >
          {props.item.itemName}
        </Typography>

        <Typography style={{ fontWeight: "600" }}>
          <DisplayPrice2 priceObject={props.item.price} type="" />
        </Typography>
      </Box>
    </>
    // </StyledDialog>
  );
}
