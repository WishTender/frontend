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
      <p style={{ margin: "7vw 9vw 0 9vw" }}>
        Add items directly from any only store without navigating to WishTender.
        With the <i>Add To WishTender Chrome</i> extension, a button will appear
        on your Chrome browser that allows you to add items to your wishlist
        within any online store you're browsing. No need to navigate to
        WishTender to add gifts.
      </p>
      <Button
        style={{
          margin: "1em 1em 1em 1em",
          fontWeight: "bold",
        }}
        color="primary"
        variant="contained"
        href="https://chrome.google.com/webstore/detail/add-to-wishtender/khafbdpkfodbigppgcpmnokmbkhhmpfc"
      >
        Get the extension
      </Button>
    </div>
  );
}
