import React from "react";
import { Button, Box, Link, Container, Typography } from "@material-ui/core";

export default function CheckOutSuccess() {
  const params = new URLSearchParams(window.location.search);

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
            alt="gift graphic"
            src={"images/gift_sent.png"}
            style={{ maxHeight: "30vh" }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{ gap: "3vh" }}
        >
          <Typography variant="h4" component="h1">
            Gift Sent
          </Typography>
          <Typography>
            Your gift has been sent. Check your email for a receipt.
          </Typography>
          <Typography>
            Keep an eye out: You might receive a thank you note from{" "}
            {params.get("aliasName") || "the recipient of the gift"} in in your
            email sometime in the future.
          </Typography>
          <Button
            variant="contained"
            href={`/${params.get("aliasHandle")}`}
            color="primary"
            style={{ width: "100%" }}
          >
            Back to @{params.get("aliasHandle")}'s wishlist
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
