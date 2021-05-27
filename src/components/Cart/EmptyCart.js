import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
export default function EmptyCart() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
      alignItems="center"
      style={{ paddingBottom: "17vh", paddingTop: "10vh" }}
    >
      <Container
        maxWidth="xs"
        align="center"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          gap: "3vh",
        }}
      >
        <Box display="flex" justifyContent="center">
          <img
            alt="empty cart graphic"
            src={"images/empty_cart_optimized_for_web.png"}
            style={{ maxHeight: "30vh" }}
          />
        </Box>
        <>
          <Box
            display="flex"
            height="16vh"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            style={{ gap: "3vh" }}
          >
            <Typography
              variant="h4"
              component="h1"
              style={{ fontSize: "clamp(2em, 4vw, 4em)" }}
            >
              Your cart is empty.
            </Typography>
          </Box>
        </>
      </Container>
    </Box>
  );
}
