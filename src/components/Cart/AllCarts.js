import React, { useEffect, useContext, useState } from "react";
import AliasCart from "./AliasCart";
import { CartContext } from "./CartContext";

export default function AllCarts({ exchangeRates }) {
  const [cart, setCart] = useState(null);
  const { getCart } = useContext(CartContext);

  useEffect(() => {
    if (!cart) {
      (async () => {
        setCart(await getCart());
      })();
    }
  }, [cart, getCart]);
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
