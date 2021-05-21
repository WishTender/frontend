import React, { useContext } from "react";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { UserContext } from "../contexts/UserContext";

export default function useChooseCurrency(screen) {
  const { user: currentUser } = useContext(UserContext);
  const { currency, setCurrencyNeeded } = useContext(CurrencyContext);

  React.useEffect(() => {
    if (!currency && !currentUser) {
      // shouldn't there be a currency if there is a user?
      setCurrencyNeeded(true);
    }
  }, [currency, setCurrencyNeeded]);
}
