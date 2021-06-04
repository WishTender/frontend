import React, { useState, useContext } from "react";
import useSmallScreen from "../../hooks/useSmallScreen";
import { withRouter } from "react-router";
import SendIcon from "@material-ui/icons/Send";

import {
  TextField,
  Paper,
  Container,
  Box,
  Typography,
} from "@material-ui/core";

import { useForm } from "react-hook-form";
import PasswordEmail from "./PasswordEmail/PasswordEmail";
import ProgressButton from "../common/ProgressButton";
export default withRouter(function ForgotPassword(props) {
  const [reqStatus, setReqStatus] = useState(null);
  const [view, setView] = useState("forgot");
  const smallScreen = useSmallScreen(450);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setReqStatus("loading");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch(process.env.REACT_APP_BASE_URL + "/api/reset-password", {
      method: "POST",
      credentials: "include",

      body: JSON.stringify(data),
      headers,
    })
      .then(async (res) => {
        if (res.status === 201) {
          setReqStatus("success");
          setView("emailSent");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { ref, ...rest } = register("email", { required: "Email Required" });

  return (
    <Box
      display="flex"
      style={{
        height: "100%",
        width: "100%",
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
                flexDirection: "column",
                justifyContent: "center",
              }
            : { padding: "30px" }
        }
      >
        {view === "forgot" && (
          <form
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography>Forgot your password?</Typography>
            <Typography variant="body2" style={{ color: "grey" }}>
              Enter your registered email below to receive password reset
              instructions.
            </Typography>

            <TextField
              name="email"
              size="small"
              type="email"
              {...rest}
              inputRef={ref}
              variant="outlined"
            />

            <ProgressButton
              color="primary"
              variant="contained"
              type="submit"
              error={reqStatus === "error"}
              success={reqStatus === "success"}
              loading={reqStatus === "loading"}
              endIcon={<SendIcon />}
            >
              Send
            </ProgressButton>
          </form>
        )}
        {view === "emailSent" && <PasswordEmail />}
      </Container>
    </Box>
  );
});
