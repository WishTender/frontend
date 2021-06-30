import React, { useState, useRef, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import CountryOptions from "../../CountryOptions/CountryOptions";
import themeStyles from "../../../themeStyles";
import { withStyles } from "@material-ui/core/styles";
import useScreenSize from "../../../hooks/useScreenSize";

import styles from "./styles";
import {
  Box,
  Container,
  FormControl,
  Button,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import HandleProgressBar from "../../common/HandleProgressBar";

export default withStyles(styles)(function Login(props) {
  const screenSize = useScreenSize({
    breakpoints: { xs: "0", sm: "600" },
    useStandard: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    clearErrors,
  } = useForm({
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
      return true;
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
  const { ref: handleRef, ...handleReg } = register("handle", {
    validate: async (value) => await validateHandle(value),

    maxLength: {
      value: 24,
      message: "handle must be less than 25 characters",
    },
    pattern: {
      value: /^[0-9A-Za-z_-]+$/,
      message: `Your handle can only contain letters, numbers, '_', or '-'`,
    },
  });
  const { ref: aliasNameRef, ...aliasNameReg } = register("aliasName", {
    required: "Display Name Required",
  });
  const { ref: countryRef, ...countryReg } = register("country", {
    required: "Country Required",
  });
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
        {screenSize === "sm" && (
          <Typography className={classes[`set-up-text1`]}>Set Up</Typography>
        )}
        <Container
          id="set-up-container"
          maxWidth={"xs"}
          component={Paper}
          className={
            classes[`set-up-container${screenSize === "xs" ? "_xs" : ""}`]
          }
        >
          {screenSize === "xs" && (
            <Typography className={classes[`set-up-text1_xs`]}>
              Set Up
            </Typography>
          )}
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
                // value={handle}
                onChange={(e) => {
                  setHandle(e.target.value);
                  if (errors.handle !== undefined) {
                    if (errors.handle.type === "validate") {
                      clearErrors(["handle"]);
                    }
                  }
                }}
                {...handleReg}
                inputRef={handleRef}
                spellCheck="false"
                placeholder="handle"
                variant="outlined"
              />

              <HandleProgressBar
                handle={handle}
                handleStatus={handleStatus}
                errors={errors}
              />
            </FormControl>
            <TextField
              label="Display Name"
              autoComplete="off"
              type="text"
              variant="outlined"
              name="aliasName"
              {...aliasNameReg}
              inputRef={aliasNameRef}
            />
            {errors.aliasName && <p>{errors.aliasName.message}</p>}

            <CountryOptions
              control={control}
              name="country"
              label="Country of bank account"
              {...countryReg}
              inputRef={countryRef}
              labelId="country-select-label"
              id="country-select"
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
