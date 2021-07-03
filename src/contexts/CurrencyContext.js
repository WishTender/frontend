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
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const cookie = `currency=${cur}${
      baseUrl === "https://api.wishtender.com" ||
      baseUrl === "https://api-staging.wishtender.com"
        ? "; domain=wishtender.com"
        : ""
    }`;
    document.cookie = cookie;
  },
  setCurrencyCookieAndContext: (cur, setCurrency) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const cookie = `currency=${cur}${
      baseUrl === "https://api.wishtender.com" ||
      baseUrl === "https://api-staging.wishtender.com"
        ? "; domain=wishtender.com"
        : ""
    }`;
    document.cookie = cookie;
    setCurrency(cur);
  },
  getCurrency: () => {},
  setCurrency: () => {},
  setCurrencyNeeded: () => {},
});
