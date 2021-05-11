import React from "react";
import { Container, Typography } from "@material-ui/core";
export default function SecondPanel() {
  return (
    <div
      style={{
        height: "100%",
        width: "50%",
        overflow: "hidden",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "space-between",
          justifyContent: "space-between",
          padding: "30px",
          background: "#0b0ba252",
          height: "100%",
        }}
      >
        <div
          style={{
            zIndex: "2",
            color: "white",
          }}
        >
          <Typography variant="h4" align="center">
            The free wishlist to get gifts from fans from any site!
          </Typography>
        </div>
        <div
          style={{
            height: "60%",

            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              height: "100%",
              position: "relative",
            }}
            src="images/woman_getting_gift_graphic.png"
            alt="woman getting gift cartoon"
          />
        </div>
        <div
          style={{
            zIndex: "2",
            color: "white",
          }}
        >
          <Typography align="center" variant="h5">
            No waiting. <br></br>Full control over orders. <br></br>Safe
            communication.
          </Typography>
        </div>
      </Container>
    </div>
  );
}
