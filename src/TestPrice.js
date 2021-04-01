import React, { useState } from "react";
import PriceInput from "./components/WishlistPage/PriceInput";

export default function TestPrice() {
  const [price, setPrice] = useState("");
  const getDecimal = (currency) => {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
    })
      .formatToParts("1")
      .find((p) => p.type === "fraction").value.length;
  };
  const toSmallestUnit = (price, currency) => {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
    })
      .formatToParts(price)
      .reduce((a, c) => {
        if (c.type === "integer" || c.type === "fraction") return a + c.value;
        return a;
      }, "");
  };
  return (
    <div>
      <PriceInput
        price={price}
        setPrice={(val) => {
          if (isNaN(+val)) console.log("oops");
          console.log(toSmallestUnit(val));
          setPrice(val);
        }}
        symbol="$"
      ></PriceInput>
    </div>
  );
}
