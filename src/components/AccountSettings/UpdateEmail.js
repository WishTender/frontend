import { useForm } from "react-hook-form";
import React from "react";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import {
  makeStyles,
  TextField,
  Button,
  Box,
  useTheme,
} from "@material-ui/core";
import useScreenSize from "../../hooks/useScreenSize";
import themeStyles from "../../themeStyles";
import ResponsiveDialogTitleSection from "../common/StyledDialog/TopSections/ResponsiveTopTitleSection/ResponsiveDialogCloseAndTitleSection";
import { fetchPatchJson } from "../../scripts/fetchHelper";

export default function UpdateEmail(props) {
  const theme = useTheme();

  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });
  const useStyles = makeStyles((theme) => {
    return {
      root: {
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        padding:
          screenSize === "xs"
            ? theme.spacing(6, 0, 1, 0)
            : theme.spacing(4, 0, 1, 0),
        width: "80%",
      },
    };
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { password } = data;
    delete data.password;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(process.env.REACT_APP_BASE_URL + "/api/users", {
      credentials: "include",
      body: JSON.stringify({ email: data.email, password }),
      method: "PATCH",
      headers,
    })
      .then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          // return setActivatedStatus("success");
        }
        const json = await res.json();
        if (res.status >= 400 && res.status < 500) {
          console.log(json);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { ref: emailRef, ...emailReg } = register("email", {
    required: "Email Required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Enter a valid e-mail address",
    },
  });
  const { ref: passwordRef, ...passwordReg } = register("password", {
    required: "Password Required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  });
  const classes = useStyles(props);
  const themeClasses = themeStyles(props);

  return (
    <StyledDialog open={true}>
      <Box
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: screenSize === "sm" && "400px",
        }}
      >
        <ResponsiveDialogTitleSection onClose={props.onClose}>
          Update Email
        </ResponsiveDialogTitleSection>
        <Box
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",

            paddingBottom: screenSize === "sm" && theme.spacing(6),
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              gap: "1em",
              alignItems: "center",
              paddingTop: theme.spacing(3),
            }}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            id="update-profile-form"
          >
            <div
              style={{
                display: "flex",
                gap: "15px",
                flexDirection: "column",
                width: "80%",
              }}
            >
              <TextField
                size="small"
                label="New Email"
                variant="outlined"
                autoComplete="off"
                name="email"
                {...emailReg}
                inputRef={emailRef}
              />
              {errors.email && <p>{errors.email.message}</p>}

              <TextField
                size="small"
                variant="outlined"
                type="password"
                label="Password"
                name="password"
                {...passwordReg}
                inputRef={passwordRef}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              type="submit"
              form="update-profile-form"
              value="Submit"
              className={
                screenSize === "xs"
                  ? themeClasses.dialogSubmitMobile
                  : themeClasses.dialogSubmit
              }
            >
              Update Email
            </Button>
          </form>
        </Box>
      </Box>
    </StyledDialog>
  );
}
