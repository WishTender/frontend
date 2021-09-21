import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Box, Button, Typography, Container } from "@material-ui/core";
import { UserContext } from "../../../contexts/UserContext";

export default function ConfirmEmail() {
  const { user, setUser, getUser } = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(null);
  const [expired, setExpired] = useState(null);
  const url = new URLSearchParams(window.location.search);
  const email = url.get("email");
  const token = url.get("token");
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
  const confirm = (email, token) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(process.env.REACT_APP_BASE_URL + "/api/confirmation/confirm", {
      credentials: "include",

      method: "PATCH",
      body: JSON.stringify({ email, token }),
      headers,
    }).then(async (res) => {
      if (res.status >= 400 && res.status < 500) {
        const json = await res.json();
        if (res.status === 410) setExpired(true);
        setMessage(json.message);
      }
      if (res.status === 200) {
        const updatedUser = await getUser();
        setUser(updatedUser);
        if (!user.aliases.length) {
          setSuccess("/wishlist-setup");
        } else {
          const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/aliases?user=${user._id}`,
            { credentials: "include" }
          );

          const json = await res.json();
          setSuccess("/" + json.handle);
        }
      }
    });
  };

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
            alt="mail graphic"
            src={
              expired
                ? "images/mail_graphic_expired2.png"
                : "images/mail_graphic_2.png"
            }
            style={{ maxHeight: "30vh" }}
          />
        </Box>
        {!expired ? (
          <>
            <Box
              display="flex"
              height="30vh"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              style={{ gap: "3vh" }}
            >
              <Typography variant="h4" component="h1">
                Confirm Email
              </Typography>
              <Typography
              // style={{ fontSize: "100%" }}
              >
                Please confirm that <b>{email}</b> is your email address by
                clicking the link below:
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "100%" }}
                onClick={() => confirm(email, token)}
              >
                Confirm
              </Button>
            </Box>
            {success ? <Redirect to={success} /> : ""}
            {message && message}
          </>
        ) : (
          <>
            <Box
              display="flex"
              height="30vh"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              style={{ gap: "3vh" }}
            >
              <Typography variant="h4" component="h1" color="error">
                Email Expired
              </Typography>
              <Typography>
                This confirmation link expired. Resend confirmation email to{" "}
                <b>{email}</b> to receive a new confirmation link sent to your
                email.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "100%", fontWeight: 600 }}
                onClick={send}
              >
                Resend Confirmation Email
              </Button>
            </Box>
            {success ? <Redirect to={success} /> : ""}
            {message && message}
          </>
        )}
        {message && message}
      </Container>
    </Box>
  );
}
