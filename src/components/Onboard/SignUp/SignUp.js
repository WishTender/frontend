import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import themeStyles from "../../../themeStyles";
import styles from "./styles";
import theme from "../../../theme";

import SecondPanel from "./SecondPanel";
import {
  Box,
  Link,
  Container,
  Button,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import useScreenSize from "../../../hooks/useScreenSize";

export default withStyles(styles)(function SignUp(props) {
  const classes = themeStyles(props);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState(null);
  const screenSize = useScreenSize({
    breakpoints: {
      mobile: 0,
      xs: 450,
      sm: 700,
    },
    useStandard: false,
  });

  const onSubmit = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(process.env.REACT_APP_BASE_URL + "/api/users/registration", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(data),
      headers,
    })
      .then(async (response) => {
        if (response.status === 500) {
          let responseText = await response.text();
          throw new Error(responseText);
        }
        return response.json();
      })
      .then((json) => {
        if (json) {
          setEmail(data.email);
          setSuccess(true);
        }
      })
      .catch(console.log);
  };
  const { ref: emailRef, ...emailReg } = register("email", {
    required: "Email Required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Enter a valid e-mail address",
    },
  });
  const { ref: passwordRef, ...passwordReg } = register("password", {
    required: "Password Required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  });
  return (
    <Box
      id="sign-up-wrapper"
      display="flex"
      className={classes["sign-up-wrapper"]}
      flexDirection="row"
      height="100%"
      alignItems="center"
    >
      <Box
        id="sign-up-left-panel"
        display="flex"
        alignItems="center"
        className={classes[`sign-up-left-panel_${screenSize}`]}
        component={Paper}
      >
        <Container
          id="sign-up-left-panel-container"
          maxWidth={"xs"}
          className={classes[`sign-up-left-panel-container_${screenSize}`]}
        >
          <Typography
            variant="h7"
            id="sign-up-text-1"
            className={
              classes["sign-up-text-1"] +
              " " +
              classes["sign-up-text-1_" + screenSize]
            }
            align="center"
          >
            {screenSize === "mobile" || screenSize === "xs"
              ? "Join WishTender to start getting gifts from fans today"
              : "Sign Up"}
          </Typography>
          <form
            id="sign-up-form"
            onSubmit={handleSubmit(onSubmit)}
            className={
              screenSize !== "mobile"
                ? classes["sign-up-form_not_mobile"]
                : classes["sign-up-form_mobile"]
            }
          >
            {success ? (
              <Redirect to={`/confirmation-email?email=${email}`} />
            ) : (
              ""
            )}

            <TextField
              label="Email"
              variant="outlined"
              autoComplete="off"
              name="email"
              {...emailReg}
              inputRef={emailRef}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <TextField
              variant="outlined"
              type="password"
              label="Password"
              name="password"
              {...passwordReg}
              inputRef={passwordRef}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <Button
              color="primary"
              className={classes.gradient + " " + classes.button}
              variant="contained"
              type="submit"
            >
              Sign Up
            </Button>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: theme.palette.primary.extraLight,
              }}
            >
              Already have an account?
              <Link
                style={{
                  paddingLeft: ".2em",
                  fontWeight: "bold",
                  color: theme.palette.primary.extraLight,
                }}
                href="/login"
              >
                Login
              </Link>
            </div>
          </form>
          {(screenSize === "xs" || screenSize === "mobile") && (
            <div
              id="img-wrapper-mobile-sm"
              className={classes["img-wrapper-mobile-small"]}
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
          )}
        </Container>
      </Box>
      {screenSize === "sm" && <SecondPanel />}
    </Box>
  );
});
