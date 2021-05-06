import React, { useEffect, useState, useContext } from "react";
import { fetchGet, fetchPostJson } from "../../scripts/fetchHelper";
import { displayPrice, parseCartPrices } from "../../scripts/helpers";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import { Container, Box, Typography, Button } from "@material-ui/core";
// import ExchangeRateApiInterface from "../../scripts/RatesAPI";
import { useForm } from "react-hook-form";
import AliasCart from "./AliasCart";
import AllCarts from "./AllCarts";

// const ratesApi = new ExchangeRateApiInterface();

export default function Cart(props) {
  const [cart, setCart] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);
  const clientCurrency = useContext(CurrencyContext);

  // const [checkoutSessionId, setCheckoutSessionId] = useState("");
  useEffect(() => {
    if (props.cart) parseCartPrices(props.cart);
    if (!props.cart && !cart) {
      fetchGet(process.env.REACT_APP_BASE_URL + "/api/cart", (crt) => {
        parseCartPrices(crt);
        setCart(crt);
      });
    }
  }, [cart, props.cart]);

  useEffect(() => {
    if (clientCurrency) {
      const fetchData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/exchange/all?base=${clientCurrency}`
        );

        const rates = await response.json();
        setExchangeRates(rates.rates);
      };

      fetchData();
    }
  }, [clientCurrency]);

  return (
    <div>
      {exchangeRates && cart && (
        <Container
          maxWidth="md"
          style={{
            marginTop: "6vw",
            paddingBottom: "7vw",
            paddingRight: "7vw",
            paddingLeft: "7vw",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" style={{ margin: "0 8px" }}>
              Cart
            </Typography>
          </Box>
          <AllCarts exchangeRates={exchangeRates} />
        </Container>
      )}
    </div>
  );
}
