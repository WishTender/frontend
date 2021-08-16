import { Button } from "@material-ui/core";
import React from "react";

export default function Extension() {
  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        padding: "0 1em",
        minHeight: "inherit",
        // height: "100%",
        // height: "500px",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        style={{
          margin: "1.5em 1em 1em 1em",
          fontWeight: "bold",
        }}
        color="primary"
        variant="contained"
        href="https://chrome.google.com/webstore/detail/add-to-wishtender/khafbdpkfodbigppgcpmnokmbkhhmpfc"
      >
        Get the extension
      </Button>

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
          style={{
            maxWidth: "100%",
          }}
          width="400"
          src="images/extension_1_web_optimized.png"
          alt="extension"
        />
        <img
          width="400"
          style={{
            maxWidth: "100%",
          }}
          src="images/extension_2_web_optimized.png"
          alt="extension"
        />
      </div>
    </div>
  );
}
