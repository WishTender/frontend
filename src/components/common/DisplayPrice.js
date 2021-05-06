import React from "react";
import ConvertedPrice from "./ConvertedPrice";
export default function DisplayPrice({ priceObject }) {
  console.trace("priceObject", priceObject);
  return (
    <>
      {priceObject.converted ? (
        <ConvertedPrice formattedPrice={priceObject} />
      ) : (
        priceObject.original
      )}
    </>
  );
}
