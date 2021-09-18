import React, { useEffect, useContext, useState } from "react";
import AliasCart from "./AliasCart";
import { CartContext } from "./CartContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import EmptyCart from "./EmptyCart";
import { Box, Typography } from "@material-ui/core";
import { KeyboardReturnOutlined } from "@material-ui/icons";
export default function AllCarts() {
  const [cart, setCart] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);
  const { getCart } = useContext(CartContext);
  const { currency: clientCurrency } = useContext(CurrencyContext);
  const localeContext = useContext(LocaleContext);

  useEffect(() => {
    if (!cart) return;
    const anyAliasCartIsNotInUSD = !!Object.values(cart.aliasCarts).filter(
      (aliasCart) => aliasCart.alias.currency !== "USD"
    ).length;

    //clientCurrency !== "noConversion" is this even necessary here? is the exchange rate used for anything outside of converting the message length?
    if (
      clientCurrency &&
      (anyAliasCartIsNotInUSD || clientCurrency !== "noConversion") &&
      !exchangeRates
    ) {
      const fetchData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/exchange/all?base=${clientCurrency}`
        );

        const rates = await response.json();
        setExchangeRates(rates.rates);
      };

      fetchData();
    }
  }, [clientCurrency, cart]);

  useEffect(() => {
    if (
      (!cart && exchangeRates) ||
      (!cart && clientCurrency === "noConversion")
    ) {
      (async () => {
        setCart(await getCart(clientCurrency, localeContext, exchangeRates));
      })();
    }
  }, [cart, clientCurrency, exchangeRates, getCart, localeContext]);
  return (
    <CartContext.Provider value={{ cart, setCart, getCart }}>
      {cart &&
        (cart.aliasCarts && Object.values(cart.aliasCarts).length ? (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6" style={{ margin: "0 8px" }}>
                Cart
              </Typography>
            </Box>
            {Object.values(cart.aliasCarts).map((cart) => (
              <AliasCart exchangeRates={exchangeRates} cart={cart} />
            ))}
          </>
        ) : (
          <EmptyCart></EmptyCart>
        ))}
    </CartContext.Provider>
  );
}
