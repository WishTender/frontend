import React, { useContext } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { Box, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/AddBox";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import theme from "../../theme";
import { fetchPatchJson } from "../../scripts/fetchHelper";
import { CartContext } from "./CartContext";
import DisplayPrice from "../common/DisplayPrice";
import { LocaleContext } from "../../contexts/LocaleContext";
import { CurrencyContext } from "../../contexts/CurrencyContext";
const useStyles = makeStyles((theme) => {
  return {
    est: { color: theme.palette.error[300] },
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

// const addToCart = (itemId, aliasId, cartContext) => {
//   fetchPatchJson(
//     { itemId, aliasId },
//     `${process.env.REACT_APP_BASE_URL}/api/cart/add-to-cart`,
//     () => updateCart(cartContext)
//   );
// };
// const reduce = (itemId, aliasId, cartContext) => {
//   fetchPatchJson(
//     { itemId, aliasId },
//     `${process.env.REACT_APP_BASE_URL}/api/cart/reduce`,
//     () => updateCart(cartContext)
//   );
// };
// const removeFromCart = (cartContext) => {
//   fetchPatchJson(
//     { itemId, aliasId },
//     `${process.env.REACT_APP_BASE_URL}/api/cart/remove-from-cart`,
//     () => updateCart(cartContext)
//   );
// };

const updateCart = async (
  route,
  itemId,
  aliasId,
  cartContext,
  localeContext,
  clientCurrency,
  exchangeRates
) => {
  fetchPatchJson(
    { itemId, aliasId },
    `${process.env.REACT_APP_BASE_URL}/api/cart/${route}`,
    async () => {
      let cart;
      cart = await cartContext.getCart(
        clientCurrency,
        localeContext,
        exchangeRates
      );
      cartContext.setCart(cart);
    }
  );
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

const Quantity = ({ gift, screen, exchangeRates }) => {
  const cartContext = useContext(CartContext);
  const localeContext = useContext(LocaleContext);
  const { currency } = useContext(CurrencyContext);

  return (
    <Box display="flex" alignItems="center">
      {screen === "xs" && "QTY: "}
      <span style={{ paddingRight: theme.spacing(1) }}>{gift.qty}</span>

      <IconButton
        onClick={() => {
          updateCart(
            "reduce",
            gift.item._id,
            gift.item.alias._id,
            cartContext,
            localeContext,
            currency,
            exchangeRates
          );
        }}
        size="small"
      >
        <RemoveIcon color="primary" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => {
          updateCart(
            "add-to-cart",
            gift.item._id,
            gift.item.alias._id,
            cartContext,
            localeContext,
            currency,
            exchangeRates
          );
        }}
      >
        <AddIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default function Gift({ gift, screen, exchangeRates }) {
  const cartContext = useContext(CartContext);
  const classes = useStyles();
  const localeContext = useContext(LocaleContext);
  const { currency } = useContext(CurrencyContext);

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
          <Quantity gift={gift} screen="xs" exchangeRates={exchangeRates} />
          <DisplayPrice priceObject={gift.price} />

          <Button
            size="small"
            color="primary"
            className={classes.giftButton_xs}
            disableElevation
            onClick={() =>
              updateCart(
                "remove-from-cart",
                gift.item._id,
                gift.item.alias._id,
                cartContext,
                localeContext,
                currency,
                exchangeRates
              )
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
                updateCart(
                  "remove-from-cart",
                  gift.item._id,
                  gift.item.alias._id,
                  cartContext,
                  localeContext,
                  currency,
                  exchangeRates
                )
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
            <DisplayPrice priceObject={gift.price} />
          </TableCell>
        </>
      )}
    </TableRow>
  );
}
