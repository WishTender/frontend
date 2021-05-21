import { IconButton, Button, MenuItem, Tooltip } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import PopUpMenu from "../common/PopUpMenu/PopUpMenu";
import currenciesMenuItemArray from "../SelectCurrencyForm/currenciesMenuArray";
export default function CurrenciesMenu({ onClose, anchorEl }) {
  const [currencyMenuAnchor, setCurrencyMenuAnchor] = useState(null);

  const toggleCurrencyMenu = (event) => {
    if (currencyMenuAnchor) {
      setCurrencyMenuAnchor(null);
    } else {
      setCurrencyMenuAnchor(event.currentTarget);
    }
  };
  const { currencyList, currency, setCurrencyCookieAndContext, setCurrency } =
    useContext(CurrencyContext);

  return (
    <>
      {currencyList?.length && currency && (
        <>
          <Tooltip title="Currency">
            <Button
              onClick={toggleCurrencyMenu}
              color="secondary"
              style={{
                minWidth: "40px",
                color: currency === "noConversion" ? "grey" : "limegreen",
              }}
            >
              {currency === "noConversion" && "$"}
              {currencyList.find((cur) => cur.code === currency).symbol}
            </Button>
          </Tooltip>
          <PopUpMenu
            onClose={() => setCurrencyMenuAnchor(null)}
            anchorEl={currencyMenuAnchor}
            open={currencyMenuAnchor}
          >
            {currenciesMenuItemArray({
              currencies: currencyList,
              onClick: (curCode) => {
                setCurrencyCookieAndContext(curCode, setCurrency);
                toggleCurrencyMenu();
              },
              currency,
            })}
          </PopUpMenu>
        </>
      )}
    </>
  );
}
