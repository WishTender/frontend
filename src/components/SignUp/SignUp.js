import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
import themeStyles from "../../themeStyles";

import SecondPanel from "./SecondPanel";
import {
  Box,
  Container,
  Button,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import useScreenSize from "../../hooks/useScreenSize";

export default function SignUp(props) {
  const classes = themeStyles(props);
  const { register, handleSubmit, errors } = useForm();
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState(null);
  const screenSize = useScreenSize({
    breakpoints: {
      mobile: 0,
      xs: 450,
      // xs: 0,
      sm: 700,
    },
    useStandard: false,
  });

  const onSubmit = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
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
  return (
    <Box
      display="flex"
      style={{
        height: "100%",
        width: "100%",
        backgroundImage:
          "url('/images/background_graphic_gradient_optimized_for_web.png')",
        backgroundSize: "cover",
        flexDirection: "row",
      }}
      flexDirection="row"
      height="100%"
      alignItems="center"
    >
      <Box
        display="flex"
        alignItems="center"
        component={Paper}
        style={
          screenSize === "sm"
            ? {
                height: "100%",
                width: "50%",
                borderRadius: 0,
                justifyContent: "SpaceBetween",
                background:
                  "linear-gradient(45deg, rgb(0 126 255 / 48%), #03b0e0)",
              }
            : screenSize === "xs"
            ? {
                height: "100%",
                width: "100%",
                borderRadius: 0,
                background:
                  "linear-gradient(45deg, rgb(0 126 255 / 48%), #03b0e0)",
              }
            : {
                height: "100%",
                width: "100%",
                borderRadius: 0,
                background:
                  "linear-gradient(45deg, rgb(0 126 255 / 0%), rgb(3 176 224 / 0%))",
              }
        }
      >
        <Container
          maxWidth={"xs"}
          style={
            screenSize === "mobile" || screenSize === "xs"
              ? {
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100%",
                  gap: "20px",
                  paddingTop: screenSize === "xs" ? "17vw" : "20vw",
                  overflow: "hidden",
                  position: "relative",
                }
              : {
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                  gap: "20px",
                  overflow: "hidden",
                  position: "relative",
                }
          }
        >
          <Typography
            variant="h7"
            style={{
              zIndex: "2",
              color: "white",
              fontSize:
                screenSize === "mobile"
                  ? "5vw"
                  : screenSize === "xs"
                  ? "2em"
                  : null,
              maxWidth: screenSize === "mobile" ? "80vw" : "inherit",
            }}
            align="center"
          >
            {screenSize === "mobile"
              ? "Join WishTender to start getting gifts from fans today"
              : screenSize === "xs"
              ? "Sign up to start getting gifts from fans today"
              : "Sign Up"}
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={
              screenSize === "mobile"
                ? {
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    width: "100%",
                    zIndex: 3,
                    maxWidth: "80vw",
                  }
                : {
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    width: "100%",
                    zIndex: 3,
                  }
            }
          >
            {success ? (
              <Redirect to={`/confirmation-email?email=${email}`} />
            ) : (
              ""
            )}
            <TextField
              placeholder="Email"
              variant="outlined"
              name="email"
              inputRef={register({
                required: "Email Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Enter a valid e-mail address",
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <TextField
              variant="outlined"
              type="password"
              placeholder="Password"
              name="password"
              inputRef={register({
                required: "Password Required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <Button
              color="primary"
              style={{ fontWeight: "600" }}
              className={classes.gradient}
              variant="contained"
              type="submit"
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              style={{
                color: "white",
                fontWeight: "600",

                border: "1px solid white",
              }}
              value="Log In"
              href="/login"
            >
              Log In
            </Button>
          </form>
          {(screenSize === "xs" || screenSize === "mobile") && (
            <div
              style={{
                height: screenSize === "mobile" ? "40vh" : "40vh",

                // display: "flex",
                position: "absolute",
                // justifyContent: "center",
                bottom: screenSize === "mobile" ? "2vh" : "2vh",
                zIndex: 0,
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
          )}
        </Container>
      </Box>
      {screenSize === "sm" && <SecondPanel />}
    </Box>
  );
}
