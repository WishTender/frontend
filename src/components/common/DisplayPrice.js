import React from "react";
import ConvertedPrice2 from "./ConvertedPrice2";
export default function DisplayPrice({ priceObject }) {
  return (
    <>
      {priceObject.converted ? (
        <ConvertedPrice2 formattedPrice={priceObject} />
      ) : (
        priceObject.displayWithFee
      )}
    </>
  );
}
