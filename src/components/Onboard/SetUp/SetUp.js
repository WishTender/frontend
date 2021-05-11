import React, { useState, useRef, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import CountryOptions from "../../CountryOptions/CountryOptions";
import themeStyles from "../../../themeStyles";
import { withStyles } from "@material-ui/core/styles";
import useScreenSize from "../../../hooks/useScreenSize";
import SecondPanel from "../SignUp/SecondPanel";

import Stepper from "../Stepper/Stepper";
import styles from "./styles";
import {
  Box,
  FormHelperText,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

export default withStyles(styles)(function Login(props) {
  const screenSize = useScreenSize({
    useStandard: true,
  });
  const { register, handleSubmit, errors, control, clearErrors } = useForm();
  const [profile, setProfile] = useState(null);
  const [handle, setHandle] = useState(null);
  const { setUser, getUser } = useContext(UserContext);
  const input = useRef(null);

  const classes = themeStyles(props);
  const handleRoute = "/api/aliases?handle_lowercased=";

  const checkHandleAvailability = async (handle) => {
    const available = await fetch(
      `${process.env.REACT_APP_BASE_URL}${handleRoute}${handle.toLowerCase()}`,
      {
        credentials: "include",
      }
    )
      .then((res) => {
        return res.status === 204 ? true : false;
      })
      .catch((err) => {
        console.log(`couldn't check handle availability: ${err}`);
      });
    return available;
  };
  const validateHandle = async (handle) => {
    const available = await new Promise((resolve) => {
      setTimeout(async function () {
        if (input.current) {
          if (handle === input.current.children[0].children[0].value) {
            const avail = await checkHandleAvailability(handle);
            resolve(avail);
          }
        }
      }, 1000);
    });
    return available || "This handle is unavailable";
  };
  const onSubmit = (data) => {
    console.log(data);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(process.env.REACT_APP_BASE_URL + "/api/aliases", {
      credentials: "include",

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
        setProfile(json.handle);
      }
    });
  };
  return (
    <Box
      id="set-up-wrapper"
      display="flex"
      className={classes["set-up-wrapper"]}
      flexDirection="column"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Typography className={classes["set-up-text1"]}>Set up</Typography>
      <Container
        id="set-up-container"
        maxWidth={"xs"}
        component={Paper}
        className={classes[`set-up-container`]}
      >
        <form
          className={classes["set-up-form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          {profile && <Redirect to={`/${profile}`} />}
          <div>
            You can change these your handle and display name at any time.
          </div>
          <FormControl>
            <TextField
              type="text"
              autoComplete="off"
              ref={input}
              name="handle"
              onChange={(e) => {
                setHandle(e.target.value);
                if (errors.handle !== undefined) {
                  if (errors.handle.type === "validate") {
                    clearErrors(["handle"]);
                  }
                }
              }}
              inputRef={register({
                validate: async (value) => await validateHandle(value),
                maxLength: {
                  value: 24,
                  message: "handle must be less than 25 characters",
                },
                pattern: {
                  value: /^[0-9A-Za-z_-]+$/,
                  message: `Your username can only contain letters, numbers, '_', or '-'`,
                },
              })}
              spellCheck="false"
              placeholder="handle"
              variant="outlined"
            />
            <FormHelperText id="handle-helper-text">
              {errors.handle?.message ||
                `www.wishtender.com/${
                  handle || props.handle ? handle || props.handle : "handle"
                }`}
            </FormHelperText>
          </FormControl>
          {errors.handle && <p>{errors.handle.message}</p>}
          <TextField
            autoComplete="off"
            type="text"
            placeholder="display name"
            variant="outlined"
            name="aliasName"
            inputRef={register({
              required: "Display Name Required",
            })}
          />
          {errors.handle && <p>{errors.aliasName.message}</p>}
          <br></br>
          <CountryOptions
            control={control}
            name="country"
            label="Country of bank account"
            inputRef={register({
              required: "Country Required",
            })}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          />

          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Container>
    </Box>
  );
});
