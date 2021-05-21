import { createContext } from "react";
import { parsedCookies } from "../scripts/helpers";
export const CurrencyContext = createContext({
  chosenCurrency: null,
  currency: null,
  currencyList: [],
  getCurrencyCookie: () => {
    const cookie = parsedCookies().currency;
    return cookie;
  },
  setCurrencyCookie: (cur) => {
    document.cookie = "currency=" + cur;
  },
  setCurrencyCookieAndContext: (cur, setCurrency) => {
    document.cookie = "currency=" + cur;
    setCurrency(cur);
  },
  getCurrency: () => {},
  setCurrency: () => {},
  setCurrencyNeeded: () => {},
});
