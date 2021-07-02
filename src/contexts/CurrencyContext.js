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
    console.log("cookie logs");
    debugger;
    console.log("currency=" + cur);
    console.log(
      "currency=" + cur + process.env.REACT_APP_BASE_URL ===
        "https://api.wishtender.com" ||
        process.env.REACT_APP_BASE_URL === "https://api-staging.wishtender.com"
        ? "; domain=wishtender.com"
        : ""
    );
    console.log(process.env.REACT_APP_BASE_URL);
    document.cookie =
      "currency=" + cur + process.env.REACT_APP_BASE_URL ===
        "https://api.wishtender.com" ||
      process.env.REACT_APP_BASE_URL === "https://api-staging.wishtender.com"
        ? "domain=wishtender.com"
        : "";
  },
  setCurrencyCookieAndContext: (cur, setCurrency) => {
    document.cookie = "currency=" + cur;
    setCurrency(cur);
  },
  getCurrency: () => {},
  setCurrency: () => {},
  setCurrencyNeeded: () => {},
});
