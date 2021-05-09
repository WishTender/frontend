import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import {
  Box,
  Container,
  Button,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import useScreenSize from "../../hooks/useScreenSize";

export default function SignUp() {
  const { register, handleSubmit, errors } = useForm();
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState(null);
  const screenSize = useScreenSize({
    breakpoints: { mobile: 0, xs: 450, sm: 700 },
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
        style={{
          height: "100%",
          width: "50%",
          borderRadius: 0,
          background: "linear-gradient(45deg, rgb(0 126 255 / 48%), #03b0e0)",
        }}
      >
        <Container
          maxWidth={"xs"}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            gap: "20px",
          }}
        >
          <Typography
            variant="h7"
            style={{
              zIndex: "2",
              color: "white",
            }}
            align="center"
          >
            Sign Up
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
            }}
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
            <Button color="primary" variant="contained" type="submit">
              Sign Up
            </Button>
            <Button
              variant="outlined"
              style={{
                color: "white",
                border: "1px solid white",
              }}
              value="Log In"
            >
              Log In
            </Button>
          </form>
        </Container>
      </Box>
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
              // src="images/graphic_with_woman_no_furniture.png"
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
    </Box>
  );
}
