import React, { useContext } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { Box, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/AddBox";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import theme from "../../theme";
import { fetchPatchJson } from "../../scripts/fetchHelper";
import { CartContext } from "./CartContext";

const useStyles = makeStyles((theme) => {
  return {
    itemName_xs: {
      fontSize: ".5rem",
      marginLeft: theme.spacing(1),
      minWidth: "80px",
      width: "100%",
    },
    cell1_xs: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(0),
      "& .MuiBox-root": { maxWidth: "250px" },
    },
    cell2_xs: { paddingLeft: theme.spacing(2), paddingRight: theme.spacing(1) },
    giftButton_xs: {
      display: "block",
      paddingLeft: theme.spacing(0),
    },
  };
});

const addToCart = (itemId, aliasId, cartContext) => {
  fetchPatchJson(
    { itemId, aliasId },
    `${process.env.REACT_APP_BASE_URL}/api/cart/add-to-cart`,
    () => updateCart(cartContext)
  );
};
const reduce = (itemId, aliasId, cartContext) => {
  fetchPatchJson(
    { itemId, aliasId },
    `${process.env.REACT_APP_BASE_URL}/api/cart/reduce`,
    () => updateCart(cartContext)
  );
};
const removeFromCart = (itemId, aliasId, cartContext) => {
  fetchPatchJson(
    { itemId, aliasId },
    `${process.env.REACT_APP_BASE_URL}/api/cart/remove-from-cart`,
    () => updateCart(cartContext)
  );
};
const updateCart = async (cartContext) => {
  let cart;
  cart = await cartContext.getCart();
  cartContext.setCart(cart);
};
const GiftImageAndName = ({ gift, classes, screen }) => {
  return (
    <>
      <img
        width="60"
        height="60"
        src={gift.item.itemImage}
        alt={gift.item.itemName}
      />
      <p className={screen === "xs" ? classes.itemName_xs : null}>
        {gift.item.itemName}
      </p>
    </>
  );
};

const Quantity = ({ gift, screen }) => {
  const cartContext = useContext(CartContext);

  return (
    <Box display="flex" alignItems="center">
      {screen === "xs" && "QTY: "}
      <span style={{ paddingRight: theme.spacing(1) }}>{gift.qty}</span>
      <IconButton
        size="small"
        onClick={() => {
          addToCart(gift.item._id, gift.item.alias._id, cartContext);
        }}
      >
        <AddIcon color="primary" />
      </IconButton>
      <IconButton
        onClick={() => {
          reduce(gift.item._id, gift.item.alias._id, cartContext);
        }}
        size="small"
      >
        <RemoveIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default function Gift({ gift, screen }) {
  const cartContext = useContext(CartContext);

  const classes = useStyles();

  return (
    <TableRow>
      <TableCell
        style={screen === "xs" ? { minWidth: "40px" } : null}
        className={screen === "xs" ? classes.cell1_xs : null}
      >
        {screen === "xs" ? (
          <Box display="flex" justifyContent="space-between">
            <GiftImageAndName gift={gift} screen={screen} classes={classes} />
          </Box>
        ) : (
          <GiftImageAndName gift={gift} screen={screen} classes={classes} />
        )}
      </TableCell>
      {screen === "xs" ? (
        <TableCell className={classes.cell2_xs}>
          <Quantity gift={gift} screen="xs" />
          <br></br>
          {gift.price}
          <Button
            size="small"
            color="primary"
            className={classes.giftButton_xs}
            disableElevation
            onClick={() =>
              removeFromCart(gift.item._id, gift.item.alias._id, cartContext)
            }
          >
            Remove
          </Button>
        </TableCell>
      ) : (
        <>
          <TableCell>
            <Button
              size="small"
              color="primary"
              onClick={() =>
                removeFromCart(gift.item._id, gift.item.alias._id, cartContext)
              }
              className={classes.giftButton_xs}
              disableElevation
            >
              Remove
            </Button>
          </TableCell>
          <TableCell>
            <Quantity gift={gift} />
          </TableCell>

          <TableCell>
            {/* <Typography style={{ fontSize: "0.6rem" }}>Subtotal: </Typography> */}
            ${gift.price}
          </TableCell>
        </>
      )}
    </TableRow>
  );
}
