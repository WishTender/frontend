import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import CountryOptions from "../CountryOptions/CountryOptions";
// import ImageInput from "../ImageInput/ImageInput.js";

export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const [handle, setHandle] = useState(null);
  const { setUser, getUser } = useContext(UserContext);

  const onSubmit = (data) => {
    console.log(data);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
    fetch(process.env.REACT_APP_BASE_URL + "/api/aliases", {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    }).then(async (res) => {
      if (res.status >= 400 && res.status < 500) {
        console.log();
        return;
      }
      if (res.status === 200 || res.status === 201) {
        const json = await res.json();
        setUser(await getUser());
        setHandle(json.handle);
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {handle && <Redirect to={`/${handle}`} />}
      <div>
        Please continue to set up your account. You can change these your handle
        and display name at any time.
      </div>
      <input
        type="text"
        placeholder="handle"
        name="handle"
        ref={register({
          required: "Handle required",
        })}
      />
      {errors.handle && <p>{errors.handle.message}</p>}
      <input
        type="text"
        placeholder="display name"
        name="aliasName"
        ref={register({
          required: "Display Name Required",
        })}
      />
      {errors.handle && <p>{errors.aliasName.message}</p>}
      <br></br>
      Country:
      <select
        type="select"
        placeholder="Country"
        name="country"
        ref={register({
          required: "Country Required",
        })}
      >
        <CountryOptions />
      </select>
      {errors.password && <p>{errors.password.message}</p>}
      <br></br>
      <input type="submit" />
    </form>
  );
}
