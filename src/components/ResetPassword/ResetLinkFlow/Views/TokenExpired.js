import React, { useState } from "react";
import { Typography, Container, Link } from "@material-ui/core";
import ProgressButton from "../../../common/ProgressButton";

export default function TokenExpired(props) {
  const [reqStatus, setReqStatus] = useState();
  const { setView } = props;
  const resend = () => {
    setReqStatus("loading");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(process.env.REACT_APP_BASE_URL + "/api/reset-password", {
      credentials: "include",

      method: "POST",
      body: JSON.stringify({ email: props.email }),
      headers,
    }).then(async (res) => {
      if (res.status >= 400 && res.status < 600) {
        setReqStatus("error");
      }
      if (res.status === 201) setView("tokenSent");
    });
  };

  return (
    <Container maxWidth={"xs"} style={{ padding: "30px" }}>
      <Typography align="center" variant="h5">
        Token expired
      </Typography>
      <Typography align="center" style={{ color: "grey" }}>
        The email token expired. <br />
        Resend email link to <b>{props.email}</b>?
      </Typography>
      <ProgressButton
        loading={reqStatus === "loading"}
        success={reqStatus === "success"}
        error={reqStatus === "error"}
        onClick={resend}
        style={{ width: "60%" }}
        successMessage={"Sent"}
      >
        Resend
      </ProgressButton>
    </Container>
  );
}
