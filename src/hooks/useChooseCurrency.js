import React, { useContext } from "react";
import { CurrencyContext } from "../contexts/CurrencyContext";

export default function useChooseCurrency(screen) {
  const { currency, setCurrencyNeeded } = useContext(CurrencyContext);

  React.useEffect(() => {
    if (!currency) {
      setCurrencyNeeded(true);
    }
  }, [currency, setCurrencyNeeded]);
}
