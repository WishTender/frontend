import React, { useState, useContext } from "react";
import useSmallScreen from "../../hooks/useSmallScreen";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router";

import {
  TextField,
  Link,
  Paper,
  Container,
  Box,
  Button,
} from "@material-ui/core";

import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
export default withRouter(function Login(props) {
  const smallScreen = useSmallScreen(444);
  const [profile, setProfile] = useState(null);
  const { setUser, getUser } = useContext(UserContext);
  const { register, handleSubmit, error } = useForm();
  const onSubmit = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch(process.env.REACT_APP_BASE_URL + "/api/users/login", {
      method: "POST",
      credentials: "include",

      body: JSON.stringify(data),
      headers,
    })
      .then(async (res) => {
        if (res.status === 429) {
          const json = await res.json();

          alert(json.message);

          return;
        }
        if (res.status === 200) {
          const json = await res.json();
          const user = await getUser();
          setUser(user);
          if (!json.profile) props.history.push("/wishlist-setup");
          setProfile(json.profile);
          // alert(res.status + json.message);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { ref: emailRef, ...emailReg } = register("email", {
    required: "Email Required",
  });
  const { ref: passwordRef, ...passwordReg } = register("password", {
    required: "Password Required",
  });
  return (
    <Box
      display="flex"
      style={{
        minHeight: "inherit",
        height: "100%",
        width: "100%",
        backgroundImage:
          "url('/images/background_graphic_pattern_Artboard.png')",
        backgroundSize: "cover",
      }}
      height="100%"
      alignItems="center"
    >
      <Container
        maxWidth={"xs"}
        component={smallScreen ? "div" : Paper}
        style={
          smallScreen
            ? {
                background: "#fff",
                height: "100%",
                width: "100%",
                display: "flex",
                padding: "30px",
                opacity: ".88",
                minHeight: "inherit",
                flexDirection: "column",
                justifyContent: "center",
              }
            : { padding: "30px", opacity: ".97" }
        }
      >
        {profile && <Redirect to={`/${profile}`} />}
        <form
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            name="email"
            type="email"
            label="Email"
            {...emailReg}
            inputRef={emailRef}
            variant="outlined"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              name="password"
              type="password"
              label="Password"
              {...passwordReg}
              inputRef={passwordRef}
              variant="outlined"
            />
            <Link
              style={{ marginTop: "5px" }}
              align="right"
              href="#"
              onClick={() => {
                props.history.push("/request-password-reset");
              }}
              variant="caption"
            >
              Forgot Password?
            </Link>
          </div>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            value="Login"
          >
            Login
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Don't have an account?
            <Link
              style={{ paddingLeft: ".2em", fontWeight: "bold" }}
              color="primary"
              variant="outlined"
              value="Sign Up"
              href="/sign-up"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </Container>
    </Box>
  );
});
