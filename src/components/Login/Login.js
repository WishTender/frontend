import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
export default function Login() {
  const [profile, setProfile] = useState(null);
  const { setUser, getUser } = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.status === 200) {
          const user = await getUser();
          setUser(user);
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
    <div>
      {profile && <Redirect to={`/${profile}`} />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="email"
          ref={register({ required: "Email Required" })}
          type="text"
        />
        <input
          name="password"
          ref={register({ required: "Password Required" })}
          type="password"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
