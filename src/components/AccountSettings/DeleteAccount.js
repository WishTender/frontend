import { useForm } from "react-hook-form";
import React, { useState } from "react";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import {
  makeStyles,
  Button,
  TextField,
  Box,
  useTheme,
} from "@material-ui/core";
import useScreenSize from "../../hooks/useScreenSize";
import themeStyles from "../../themeStyles";
import ResponsiveDialogTitleSection from "../common/StyledDialog/TopSections/ResponsiveTopTitleSection/ResponsiveDialogCloseAndTitleSection";
import ProgressButton from "../common/ProgressButton";
import userEvent from "@testing-library/user-event";

export default function UpdateEmail(props) {
  const theme = useTheme();

  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [reqStatus, setReqStatus] = useState(null);
  const onSubmit = async (data) => {
    setReqStatus("loading");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(process.env.REACT_APP_BASE_URL + "/api/users/" + props.user._id, {
      credentials: "include",
      body: JSON.stringify(data),
      method: "DELETE",
      headers,
    })
      .then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          setReqStatus("success");
          props.onClose();
          // go to home
        }
        const json = await res.json();
        if (res.status >= 400 && res.status < 500) {
          setReqStatus("error");
          console.log(json);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { ref: passwordRef, ...passwordReg } = register("password", {
    required: "Password Required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  });
  const { ref: phraseRef, ...phraseReg } = register("phrase", {
    required: "Confirmation phrase require.",
    pattern: {
      value: /^permanently delete$/,
      message: (
        <span>
          Write <i>permanently delete</i> to continue
        </span>
      ),
    },
  });
  const themeClasses = themeStyles(props);

  return (
    <Box
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: screenSize === "sm" && "400px",
      }}
    >
      <ResponsiveDialogTitleSection onClose={props.onClose}>
        Delete Account
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
              gap: screenSize === "xs" ? "2em" : "1em",
              height: "100%",
              flexDirection: "column",
              width: "80%",
              justifyContent: "center",
            }}
          >
            <TextField
              style={{ height: "4em" }}
              size="small"
              variant="outlined"
              type="password"
              label="Password"
              name="password"
              helperText={errors.password && errors.password.message}
              {...passwordReg}
              inputRef={passwordRef}
            />

            <TextField
              style={{ height: "4em" }}
              size="small"
              label={
                <span>
                  Type <i>permanently delete</i> to continue
                </span>
              }
              variant="outlined"
              autoComplete="off"
              name="phrase"
              helperText={errors.phrase && errors.phrase.message}
              {...phraseReg}
              inputRef={phraseRef}
            />
          </div>

          <ProgressButton
            type="submit"
            loading={reqStatus === "loading"}
            error={reqStatus === "error"}
            success={reqStatus === "success"}
            successMessage="Successfully Deleted"
            wrapperClassName={
              screenSize === "xs"
                ? themeClasses.dialogSubmitMobileProgressWrap
                : themeClasses.dialogSubmitProgressWrap
            }
            className={
              screenSize === "xs"
                ? themeClasses.dialogSubmitMobileProgress
                : themeClasses.dialogSubmitProgress
            }
          >
            Delete Account
          </ProgressButton>
        </form>
      </Box>
    </Box>
  );
}
