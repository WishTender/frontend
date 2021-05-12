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
  FormControl,
  Button,
  Paper,
  TextField,
  Typography,
  LinearProgress,
} from "@material-ui/core";

export default withStyles(styles)(function Login(props) {
  const screenSize = useScreenSize({
    breakpoints: { xs: "0", sm: "600" },
    useStandard: false,
  });
  const { register, handleSubmit, errors, control, clearErrors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [profile, setProfile] = useState(null);
  const [handle, setHandle] = useState(null);
  const [handleStatus, setHandleStatus] = useState("");
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
    if (handle === "") {
      setHandleStatus("");
      return;
    }
    setHandleStatus("loading");
    const available = await new Promise((resolve) => {
      setTimeout(async function () {
        if (input.current) {
          if (handle === input.current.children[0].children[0].value) {
            const avail = await checkHandleAvailability(handle);
            resolve(avail);
            setHandleStatus(avail ? "available" : "unavailable");
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
    <>
      {/* <Stepper></Stepper> */}
      <Box
        id="set-up-wrapper"
        display="flex"
        className={classes[`set-up-wrapper${screenSize === "xs" ? "_xs" : ""}`]}
        flexDirection="column"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          className={classes[`set-up-text1${screenSize === "xs" ? "_xs" : ""}`]}
        >
          Set Up
        </Typography>
        <Container
          id="set-up-container"
          maxWidth={"xs"}
          component={Paper}
          className={
            classes[`set-up-container${screenSize === "xs" ? "_xs" : ""}`]
          }
        >
          <form
            className={classes["set-up-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            {profile && <Redirect to={`/${profile}`} />}
            <Typography variant="body2">
              You can change your <b>handle</b> and <b>display name</b> at any
              time.
            </Typography>
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
                    message: `Your handle can only contain letters, numbers, '_', or '-'`,
                  },
                })}
                spellCheck="false"
                placeholder="handle"
                variant="outlined"
              />
              <FormHelperText id="handle-helper-text">
                <LinearProgress
                  className={
                    handleStatus === "unavailable"
                      ? classes.progressError
                      : handleStatus === "available"
                      ? classes.progressSuccess
                      : ""
                  }
                  color={handleStatus === "loading" ? "secondary" : "primary"}
                  variant={
                    handleStatus === "loading" ? "indeterminate" : "determinate"
                  }
                  value={100}
                />
                {errors.handle?.message ||
                  `www.wishtender.com/${
                    handle || props.handle ? handle || props.handle : "handle"
                  }`}{" "}
                <div style={{ display: "inline", float: "right" }}>
                  {handleStatus === "available" ? "Available" : ""}
                </div>
              </FormHelperText>
            </FormControl>
            <TextField
              label="Display Name"
              autoComplete="off"
              type="text"
              variant="outlined"
              name="aliasName"
              inputRef={register({
                required: "Display Name Required",
              })}
            />
            {errors.aliasName && <p>{errors.aliasName.message}</p>}

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
    </>
  );
});
