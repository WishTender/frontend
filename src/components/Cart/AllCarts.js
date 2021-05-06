import React, { useEffect, useContext, useState } from "react";
import AliasCart from "./AliasCart";
import { CartContext } from "./CartContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import { CurrencyContext } from "../../contexts/CurrencyContext";

export default function AllCarts() {
  const [cart, setCart] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);
  const { getCart } = useContext(CartContext);
  const clientCurrency = useContext(CurrencyContext);
  const localeContext = useContext(LocaleContext);

  useEffect(() => {
    if (clientCurrency) {
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
    if (!cart && exchangeRates) {
      (async () => {
        setCart(await getCart(clientCurrency, localeContext, exchangeRates));
      })();
    }
  }, [cart, clientCurrency, exchangeRates, getCart, localeContext]);
  return (
    <CartContext.Provider value={{ cart, setCart, getCart }}>
      {cart && (
        <>
          {Object.values(cart.aliasCarts).map((cart) => (
            <AliasCart exchangeRates={exchangeRates} cart={cart} />
          ))}
        </>
      )}
    </CartContext.Provider>
  );
}
