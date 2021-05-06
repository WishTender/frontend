import React from "react";
import ConvertedPrice from "./ConvertedPrice";
export default function DisplayPrice({ priceObject }) {
  return (
    <>
      {priceObject.converted ? (
        <ConvertedPrice formattedPrice={priceObject} />
      ) : (
        priceObject.display
      )}
    </>
  );
}
