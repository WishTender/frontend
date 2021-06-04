import { Container, Box, Button, Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
import React from "react";
import useScreenSize from "../../../hooks/useScreenSize";
const useStyles = makeStyles(styles);

export default withStyles(styles)(function PasswordEmail(props) {
  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });

  const classes = useStyles();
  const url = new URLSearchParams(window.location.search);
  const email = url.get("email");

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
        }}
        alt="mail graphic"
        src="images/mail_graphic.png"
      ></img>
      {/* <div> */}
      <Typography
        variant="h4"
        align="center"
        className={classes[`text1${screenSize === "xs" ? "_xs" : ""}`]}
      >
        Check Your Email
      </Typography>
      <Typography
        className={classes[`text2${screenSize === "xs" ? "_xs" : ""}`]}
        align="center"
      >
        Password reset instructions have been sent to your email
      </Typography>
      <Typography
        className={classes[`text2${screenSize === "xs" ? "_xs" : ""}`]}
        align="center"
      >
        <b>{email || props.email}</b>
      </Typography>
      <Typography
        align="center"
        className={classes[`text2${screenSize === "xs" ? "_xs" : ""}`]}
      >
        Check your email and click the reset link to continue.
      </Typography>
    </Container>
  );
});
