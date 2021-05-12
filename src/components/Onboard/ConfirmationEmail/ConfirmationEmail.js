import { Container, Box, Button, Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
import React, { useState } from "react";
import useScreenSize from "../../../hooks/useScreenSize";
const useStyles = makeStyles(styles);

export default withStyles(styles)(function ConfirmationEmail() {
  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 600 },
    useStandard: false,
  });

  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const url = new URLSearchParams(window.location.search);
  const email = url.get("email");
  const send = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
    fetch(process.env.REACT_APP_BASE_URL + "/api/confirmation/resend", {
      credentials: "include",

      method: "POST",
      body: JSON.stringify({ email }),
      headers,
    }).then(async (res) => {
      if (res.status >= 400 && res.status < 500) {
        const json = await res.json();
        setMessage(json.message);
      }
      if (res.status === 201) setMessage("Sent");
    });
  };

  return (
    <Container
      maxWidth="sm"
      className={classes[`container${screenSize === "xs" ? "_xs" : ""}`]}
    >
      <img
        style={{
          position: "relative",
          width: "60vw",
          maxWidth: "280px",
          left: "-6%",
        }}
        src="images/mail_graphic.png"
      ></img>
      {/* <div> */}
      <Typography
        variant="h4"
        align="center"
        className={classes[`text1${screenSize === "xs" ? "_xs" : ""}`]}
      >
        Confirm your email.
      </Typography>
      <Typography
        className={classes[`text2${screenSize === "xs" ? "_xs" : ""}`]}
        align="center"
      >
        A confirmation has been sent to
        <br /> <b>{email}somemail@plpl.com</b>
        <br />
      </Typography>
      <Typography
        align="center"
        className={classes[`text2${screenSize === "xs" ? "_xs" : ""}`]}
      >
        Check your email and click the confirmation link to continue.
      </Typography>
      {/* </div> */}
      <Button
        align="center"
        color="primary"
        onClick={send}
        className={classes.button}
      >
        Resend Link {email}
      </Button>
      {message && message}
    </Container>
  );
});
