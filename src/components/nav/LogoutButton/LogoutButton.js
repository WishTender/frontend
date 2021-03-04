import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function LogoutButton() {
  const [loggedOut, setLoggedOut] = useState(false);
  const logout = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch("/api/users/logout", {
      method: "POST",
    })
      .then(async (res) => {
        if (res.status === 201) {
          alert("Logout successful");
          setLoggedOut(true);
          return;
        }
        const text = await res.text();
        alert(res.status + text);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Button onClick={logout}>
      {loggedOut && <Redirect to="/" />}
      Logout
    </Button>
  );
}
