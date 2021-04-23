import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

export default function LogoutButton(props) {
  const [loggedOut, setLoggedOut] = useState(false);
  const logout = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch(process.env.REACT_APP_BASE_URL + "/api/users/logout", {
      credentials: "include",

      method: "POST",
    })
      .then(async (res) => {
        if (res.status === 201) {
          alert("Logout successful");
          if (props.callBack) props.callBack();
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
    <>
      {props.children ? (
        <div onClick={logout}>
          {props.children} {loggedOut && <Redirect to="/" />}
        </div>
      ) : (
        <Button color="primary" onClick={logout}>
          {/* <AccountBoxIcon fontSize="medium" /> */}
          Log Out
          {loggedOut && <Redirect to="/" />}
        </Button>
      )}
    </>
  );
}
