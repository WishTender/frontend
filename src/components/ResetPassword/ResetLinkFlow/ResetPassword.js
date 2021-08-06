import React, { useState, useEffect } from "react";

import { Box } from "@material-ui/core";
import ResetPasswordForm from "./Views/ResetPasswordForm";
import TokenExpired from "./Views/TokenExpired";
import BadLink from "./Views/BadLink";
import PasswordEmail from "../PasswordEmail/PasswordEmail";
import ResetSuccess from "./Views/ResetSuccess";

export default function ResetPassword() {
  const [view, setView] = useState("reset");
  const url = new URLSearchParams(window.location.search);
  const email = url.get("email");
  const token = url.get("token");
  useEffect(() => {
    if (!email || !token) setView("badLink");
  }, [email, token]);
  return (
    <Box
      display="flex"
      style={{
        height: "100%",
        minHeight: "inherit",
        width: "100%",
        backgroundSize: "cover",
      }}
      height="100%"
      alignItems="center"
    >
      {view === "reset" && (
        <ResetPasswordForm setView={setView}></ResetPasswordForm>
      )}
      {view === "success" && <ResetSuccess />}
      {view === "expired" && <TokenExpired setView={setView} email={email} />}
      {view === "badLink" && <BadLink />}
      {view === "tokenSent" && <PasswordEmail />}
    </Box>
  );
}
