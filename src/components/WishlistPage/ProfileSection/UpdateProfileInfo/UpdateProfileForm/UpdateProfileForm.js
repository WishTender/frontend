import React, { useState, useRef } from "react";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import CloseIcon from "@material-ui/icons/Close";
import { Button, Typography, IconButton, Dialog, Box } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import useScreenSize from "../../../../../hooks/useScreenSize";
import ResponsiveDialogCloseAndTitleSection from "../../../../common/StyledDialog/TopSections/ResponsiveTopTitleSection/ResponsiveDialogCloseAndTitleSection";
import themeStyles from "../../../../../themeStyles";
import theme from "../../../../../theme";
import HandleProgressBar from "../../../../common/HandleProgressBar";
/**
 * Renders a <UpdateProfileForm /> component
 * @param  props
 * @param  props.handleCheckHandleAvailability
 **/
export default function UpdateProfileForm(props) {
  const themeClasses = themeStyles(props);
  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });
  const { register, handleSubmit, errors, clearErrors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [handleStatus, setHandleStatus] = useState("");

  const [handle, setHandle] = useState(null);
  const input = useRef(null);

  const validateHandle = async (handle) => {
    if (!handle || handle.toLowerCase() === props.handle.toLowerCase()) {
      setHandleStatus("");
      return true;
    }
    setHandleStatus("loading");

    const available = await new Promise((resolve) => {
      setTimeout(async function () {
        if (input.current) {
          if (handle === input.current.children[0].value) {
            const avail = await props.handleCheckHandleAvailability(handle);
            resolve(avail);
            setHandleStatus(avail ? "available" : "unavailable");
          }
        }
      }, 1000);
    });
    return available || "This handle is unavailable";
  };

  const onSubmit = (data) => {
    if (data.handle && data.handle !== props.handle)
      props.handleUpdateHandle(data.handle);
    if (data.wishlistName && data.wishlistName !== props.wishlistName) {
      props.handleUpdateWishlistName(data.wishlistName);
    }
    if (data.aliasName && data.aliasName !== props.aliasName) {
      props.handleUpdateAliasName(data.aliasName);
    }
    props.onClose();
  };
  return (
    <Box
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: screenSize === "sm" && "400px",
      }}
    >
      <ResponsiveDialogCloseAndTitleSection onClose={props.onClose}>
        Profile Info
      </ResponsiveDialogCloseAndTitleSection>
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
            <FormControl
              style={{ marginBottom: "25px" }}
              error={
                errors.handle && !(errors.handle.type === "required")
                  ? true
                  : false
              }
            >
              <InputLabel htmlFor="handle-input">handle</InputLabel>
              <Input
                // onFocus={(e) => {
                //   if (!e.target.value) e.target.value = props.handle;
                // }}
                // onBlur={(e) => {
                //   if (e.target.value === props.handle) e.target.value = null;
                // }}
                defaultValue={props.handle}
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
                id="handle-input"
                aria-describedby="handle-helper-text"
              />
              {/* <FormHelperText id="handle-helper-text">
                {errors.handle?.message ||
                  `www.wishtender.com/${
                    handle || props.handle ? handle || props.handle : "handle"
                  }`}
              </FormHelperText> */}
              <HandleProgressBar
                handle={handle}
                handleStatus={handleStatus}
                errors={errors}
              />
            </FormControl>
            <FormControl
              error={
                errors.wishlistName &&
                !(errors.wishlistName.type === "required")
                  ? true
                  : false
              }
            >
              <InputLabel htmlFor="wishlist-name-input">
                Wishlist Name
              </InputLabel>
              <Input
                // onFocus={(e) => {
                //   if (!e.target.value) e.target.value = props.wishlistName;
                // }}
                // onBlur={(e) => {
                //   if (e.target.value === props.wishlistName)
                //     e.target.value = null;
                // }}
                defaultValue={props.wishlistName}
                name="wishlistName"
                inputRef={register({
                  maxLength: {
                    value: 100,
                    message: "wishlist name must be less than 100 characters",
                  },
                })}
                spellCheck="false"
                id="wishlist-name-input"
                aria-describedby="wishlist-name-helper-text"
              />
              <FormHelperText id="wishlist-name-helper-text">
                {errors.wishlistName?.message || " "}
              </FormHelperText>
            </FormControl>
            <FormControl
              error={
                errors.aliasName && !(errors.aliasName.type === "required")
                  ? true
                  : false
              }
            >
              <InputLabel htmlFor="alias-name-input">Alias Name</InputLabel>
              <Input
                // onFocus={(e) => {
                //   if (!e.target.value) e.target.value = props.aliasName;
                // }}
                // onBlur={(e) => {
                //   if (e.target.value === props.aliasName) e.target.value = null;
                // }}
                defaultValue={props.aliasName}
                name="aliasName"
                inputRef={register({
                  maxLength: {
                    value: 100,
                    message: "alias name must be 100 characters or less",
                  },
                })}
                spellCheck="false"
                id="alias-name-input"
                aria-describedby="alias-name-helper-text"
              />
              <FormHelperText id="alias-name-helper-text">
                {errors.aliasName?.message || " "}
              </FormHelperText>
            </FormControl>
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
            Save
          </Button>
        </form>
      </Box>
      {/* </Dialog> */}
    </Box>
  );
}
