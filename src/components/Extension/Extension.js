import React from "react";

export default function Extension() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "auto",
        height: "100%",
        maxHeight: "500px",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Coming Soon! </h1>
      <h2>
        Use our new chrome extension to add gifts to your wishlist while
        browsing online stores.
      </h2>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "1em",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <img
          width="400"
          src="images/extension_1_web_optimized.png"
          alt="extension"
        />
        <img
          width="400"
          src="images/extension_2_web_optimized.png"
          alt="extension"
        />
      </div>
    </div>
  );
}
