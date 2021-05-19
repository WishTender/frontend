import { createContext } from "react";
import { fetchGet } from "../../scripts/fetchHelper";
import { parseCartPrices } from "../../scripts/helpers";

export const CartContext = createContext({
  cart: null,
  setCart: () => {},
  getCart: async (clientCurrency, localeContext, exchangeRates) => {
    let cart;
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/cart`, {
      credentials: "include",
    })
      .then(async (res) => {
        cart = await res.json();
        if (!Object.keys(cart).length) return;
        parseCartPrices(cart, clientCurrency, localeContext, exchangeRates);
      })
      .catch((err) => {
        console.log(`couldn't get cart`);
      });
    // await fetchGet(`${process.env.REACT_APP_BASE_URL}/api/cart`, (res) => {
    //   cart = res;
    //   parseCartPrices(cart, clientCurrency, localeContext, exchangeRates);
    // });
    return cart || null;
  },
});
// import { createContext } from "react";
// import { fetchGet } from "../../scripts/fetchHelper";
// import { parseCartPrices } from "../../scripts/helpers";

// export const CartContext = createContext({
//   cart: null,
//   setCart: () => {},
//   getCart: async (clientCurrency, localeContext, exchangeRates) => {
//     let cart;
//     await fetch(`${process.env.REACT_APP_BASE_URL}/api/cart`, {
//       credentials: "include",
//     })
//       .then(async (res) => {
//         cart = await res.json();
//         if (!Object.keys({}).length) return;
//         parseCartPrices(cart, clientCurrency, localeContext, exchangeRates);
//       })
//       .catch((err) => {
//         console.log(`couldn't get cart`);
//       });
//     return cart || {};
//   },
// });
