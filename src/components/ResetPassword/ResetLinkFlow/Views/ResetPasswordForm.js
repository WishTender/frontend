import React, { useState, useContext } from "react";
import useSmallScreen from "../../../../hooks/useSmallScreen";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../../contexts/UserContext";

import { TextField, Paper, Container, Typography } from "@material-ui/core";
import ProgressButton from "../../../common/ProgressButton";
export default function ResetPasswordForm(props) {
  const { setView } = props;
  const [reqStatus, setReqStatus] = useState(null);
  const { user, setUser, getUser } = useContext(UserContext);

  const smallScreen = useSmallScreen(450);
  const { register, handleSubmit, watch, formState } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { errors } = formState;

  const url = new URLSearchParams(window.location.search);
  const email = url.get("email");
  const token = url.get("token");

  const onSubmit = (data) => {
    setReqStatus("loading");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(process.env.REACT_APP_BASE_URL + "/api/reset-password", {
      credentials: "include",

      method: "PATCH",
      body: JSON.stringify({ ...data, email, token }),
      headers,
    }).then(async (res) => {
      if (res.status >= 400 && res.status < 600) {
        setReqStatus("error");
        if (res.status === 410) setView("expired");
      }
      if (res.status === 200) {
        if (!user) {
          const loggedInUser = await getUser();
          setUser(loggedInUser);
        }
        setReqStatus("success");
        setView("success");
      }
    });
  };
  const { ref, ...rest } = register("password", {
    required: "Password Required",
    minLength: {
      value: 8,
      message: `Password must be at least 8 characters long.`,
    },
  });
  const { ref: refConfirm, ...restConfirm } = register("passwordConfirm", {
    required: "Password Confirm Required",
    validate: (value) => {
      return value === watch("password") || `Passwords do not match.`;
    },
  });
  return (
    <Container
      maxWidth={"xs"}
      component={smallScreen ? "div" : Paper}
      style={
        smallScreen
          ? {
              background: "#fff",
              height: "100%",
              minHeight: "inherit",
              width: "100%",
              display: "flex",
              padding: "30px",
              flexDirection: "column",
              justifyContent: "center",
            }
          : { padding: "30px" }
      }
    >
      <form
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography>Create a new password</Typography>
        <Typography variant="body2" style={{ color: "grey" }}>
          Password must be 8 characters long.
        </Typography>

        <TextField
          name="password"
          size="small"
          type="password"
          label="Password"
          {...rest}
          helperText={errors?.password?.message || " "}
          inputRef={ref}
          variant="outlined"
        />
        <TextField
          name="passwordConfirm"
          label="Confirm password"
          size="small"
          type="password"
          {...restConfirm}
          inputRef={refConfirm}
          helperText={errors?.passwordConfirm?.message || " "}
          variant="outlined"
        />
        <ProgressButton
          type="submit"
          disabled={!formState.isValid || reqStatus === "expired"}
          loading={reqStatus === "loading"}
          error={reqStatus === "error"}
          success={reqStatus === "success"}
        >
          Reset Password
        </ProgressButton>
      </form>
    </Container>
  );
}
