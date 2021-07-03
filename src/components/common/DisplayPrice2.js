import React from "react";
import ConvertedPrice2 from "./ConvertedPrice2";
export default function DisplayPrice2({ priceObject, type }) {
  return (
    <>
      {priceObject.converted ? (
        <ConvertedPrice2 formattedPrice={priceObject} type={type} />
      ) : (
        priceObject["display" + type]
      )}
    </>
  );
}
