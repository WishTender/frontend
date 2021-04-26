import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { UserContext } from "../../../contexts/UserContext";

export default function LogoutButton(props) {
  const [loggedOut, setLoggedOut] = useState(false);
  const { getUser, setUser } = useContext(UserContext);
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
          const user = await getUser();
          setLoggedOut(true);
          setUser(user);
          return;
        }
        const text = await res.text();
        alert(res.status + text);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clone = props.children
    ? React.cloneElement(props.children, { onClick: logout })
    : null;
  return (
    <>
      {loggedOut && <Redirect to="/" />}
      {props.children ? (
        <> {clone}</>
      ) : (
        <Button color="primary" onClick={logout}>
          {/* <AccountBoxIcon fontSize="medium" /> */}
          Log Out
        </Button>
      )}
    </>
  );
}
