import { createContext } from "react";
import { fetchGet } from "../../scripts/fetchHelper";
import { parseCartPrices } from "../../scripts/helpers";

export const CartContext = createContext({
  cart: null,
  setCart: () => {},
  getCart: async (clientCurrency, localeContext, exchangeRates) => {
    let cart;
    await fetchGet(`${process.env.REACT_APP_BASE_URL}/api/cart`, (res) => {
      cart = res;
      parseCartPrices(cart, clientCurrency, localeContext, exchangeRates);
    });
    return cart || null;
  },
});