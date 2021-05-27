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
        const json = await res.json();
        if (res.status === 200) {
          const user = await getUser();
          setUser(user);
          if (!json.profile) props.history.push("/wishlist-setup");
          setProfile(json.profile);
          return;
        }
        alert(res.status + json);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box
      display="flex"
      style={{
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
            inputRef={register({ required: "Email Required" })}
            variant="outlined"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              name="password"
              type="password"
              inputRef={register({ required: "Password Required" })}
              variant="outlined"
            />
            <Link
              style={{ marginTop: "5px" }}
              align="right"
              href="#"
              onClick={() => {}}
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
          <Button
            color="primary"
            variant="outlined"
            value="Sign Up"
            href="/sign-up"
          >
            Sign Up
          </Button>
        </form>
      </Container>
    </Box>
  );
});
