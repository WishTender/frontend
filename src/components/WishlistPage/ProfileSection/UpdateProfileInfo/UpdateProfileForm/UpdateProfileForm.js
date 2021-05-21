import React, { useState, useRef } from "react";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import CloseIcon from "@material-ui/icons/Close";
import { Button, Typography, IconButton, Dialog } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import useScreenSize from "../../../../../hooks/useScreenSize";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "90%",
    },
    title: {
      // margin: theme.spacing(2),
    },
  };
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">Tooo</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

/**
 * Renders a <UpdateProfileForm /> component
 * @param  props
 * @param  props.handleCheckHandleAvailability
 **/
export default function UpdateProfileForm(props) {
  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });
  const { register, handleSubmit, errors, clearErrors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [handle, setHandle] = useState(null);
  const input = useRef(null);
  const classes = useStyles();

  const validateHandle = async (handle) => {
    if (!handle || handle.toLowerCase() === props.handle.toLowerCase()) return;
    const available = await new Promise((resolve) => {
      setTimeout(async function () {
        if (input.current) {
          if (handle === input.current.children[0].value) {
            const avail = await props.handleCheckHandleAvailability(handle);
            resolve(avail);
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
    props.onClose();
  };
  return (
    <>
      {/* <Dialog open> */}
      <MuiDialogTitle
        className={
          screenSize === "xs" ? props.classes.title_xs : props.classes.title
        }
      >
        {screenSize === "xs" && (
          <IconButton
            aria-label="close"
            className={
              screenSize === "xs"
                ? props.classes.closeButton_xs
                : props.classes.closeButton
            }
            onClick={props.onClose}
          >
            <ArrowBackIcon color="primary" />
          </IconButton>
        )}
        <Typography
          variant="h6"
          style={
            screenSize === "xs"
              ? { right: "14%", position: "relative" }
              : { display: "none" }
          }
          color="primary"
        >
          Profile Info
        </Typography>
        <IconButton
          aria-label="close"
          className={
            screenSize === "xs"
              ? props.classes.closeButton_xs
              : props.classes.closeButton
          }
          onClick={props.onClose}
        >
          <CloseIcon color="primary" />
        </IconButton>
      </MuiDialogTitle>
      {screenSize === "sm" && (
        <Typography variant="h7" color="primary">
          Profile Info
        </Typography>
      )}
      <Container
        // className={classes.root}
        className={
          screenSize === "xs"
            ? props.classes.dialogContent_xs
            : props.classes.dialogContent
        }
        width="100%"
      >
        <form
          style={{ display: "grid", gap: "1em" }}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          id="update-profile-form"
        >
          <FormControl
            error={
              errors.handle && !(errors.handle.type === "required")
                ? true
                : false
            }
          >
            <InputLabel htmlFor="handle-input">handle</InputLabel>
            <Input
              onFocus={(e) => {
                if (!e.target.value) e.target.value = props.handle;
              }}
              onBlur={(e) => {
                if (e.target.value === props.handle) e.target.value = null;
              }}
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
            <FormHelperText id="handle-helper-text">
              {errors.handle?.message ||
                `www.wishtender.com/${
                  handle || props.handle ? handle || props.handle : "handle"
                }`}
            </FormHelperText>
          </FormControl>
          <FormControl
            error={
              errors.wishlistName && !(errors.wishlistName.type === "required")
                ? true
                : false
            }
          >
            <InputLabel htmlFor="wishlist-name-input">Wishlist Name</InputLabel>
            <Input
              onFocus={(e) => {
                if (!e.target.value) e.target.value = props.wishlistName;
              }}
              onBlur={(e) => {
                if (e.target.value === props.wishlistName)
                  e.target.value = null;
              }}
              name="wishlistName"
              inputRef={register({
                maxLength: {
                  value: 22,
                  message: "wishlist name must be less than 23 characters",
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
          <Button
            variant="contained"
            disableElevation
            color="primary"
            type="submit"
            form="update-profile-form"
            value="Submit"
            className={
              screenSize === "xs"
                ? props.classes.submit_xs
                : props.classes.submit
            }
          >
            Save
          </Button>
        </form>
      </Container>
      {/* </Dialog> */}
    </>
  );
}
