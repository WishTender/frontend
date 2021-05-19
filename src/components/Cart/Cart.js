import React from "react";
import { Container, Box, Typography } from "@material-ui/core";
// import ExchangeRateApiInterface from "../../scripts/RatesAPI";

import AllCarts from "./AllCarts";
import useChooseCurrency from "../../hooks/useChooseCurrency";

// const ratesApi = new ExchangeRateApiInterface();

export default function Cart(props) {
  useChooseCurrency();
  return (
    <div>
      <Container
        maxWidth="md"
        style={{
          marginTop: "6vw",
          paddingBottom: "7vw",
          paddingRight: "7vw",
          paddingLeft: "7vw",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" style={{ margin: "0 8px" }}>
            Cart
          </Typography>
        </Box>
        <AllCarts />
      </Container>
    </div>
  );
}
