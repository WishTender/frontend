import React, { useEffect, useContext, useState } from "react";
import AliasCart from "./AliasCart";
import { CartContext } from "./CartContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import { CurrencyContext } from "../../contexts/CurrencyContext";

export default function AllCarts({ exchangeRates }) {
  const [cart, setCart] = useState(null);
  const { getCart } = useContext(CartContext);
  const clientCurrency = useContext(CurrencyContext);
  const localeContext = useContext(LocaleContext);

  useEffect(() => {
    if (!cart) {
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
