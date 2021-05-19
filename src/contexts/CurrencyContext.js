import { createContext } from "react";
export const CurrencyContext = createContext({
  chosenCurrency: null,
  currency: null,
  currencyList: [],
  setCurrency: () => {},
  setCurrencyNeeded: () => {},
});
