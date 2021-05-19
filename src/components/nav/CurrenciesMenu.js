import { IconButton, Button, MenuItem, Tooltip } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import PopUpMenu from "../common/PopUpMenu/PopUpMenu";
export default function CurrenciesMenu({ onClose, anchorEl }) {
  const [currencyMenuAnchor, setCurrencyMenuAnchor] = useState(null);

  const toggleCurrencyMenu = (event) => {
    if (currencyMenuAnchor) {
      setCurrencyMenuAnchor(null);
    } else {
      setCurrencyMenuAnchor(event.currentTarget);
    }
  };
  const { currencyList, currency, setCurrenciesNeeded } =
    useContext(CurrencyContext);
  //   useEffect(() => {
  //     if (!currency) setCurrenciesNeeded(true);
  //   }, [currency, setCurrenciesNeeded]);
  const currencies = currencyList.map((cur) => <MenuItem>{cur.name}</MenuItem>);
  return (
    <>
      {currencyList && currency && (
        <>
          <Tooltip title="Currency">
            <Button onClick={toggleCurrencyMenu} style={{ color: "limegreen" }}>
              {currencyList.find((cur) => cur.symbol).symbol}
            </Button>
          </Tooltip>
          <PopUpMenu
            onClose={() => setCurrencyMenuAnchor(null)}
            anchorEl={currencyMenuAnchor}
            open={currencyMenuAnchor}
          >
            {currencies}
          </PopUpMenu>
        </>
      )}
    </>
  );
}
