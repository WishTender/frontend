import React, { useState, useRef } from "react";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import { Button, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";

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

/**
 * Renders a <UpdateProfileForm /> component
 * @param  props
 * @param  props.handleCheckHandleAvailability
 **/
export default function UpdateProfileForm(props) {
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
    <Container className={classes.root}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        id="update-profile-form"
      >
        <Typography className={classes.root}>Profile Info</Typography>
        <FormControl
          error={
            errors.handle && !(errors.handle.type === "required") ? true : false
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
              if (e.target.value === props.wishlistName) e.target.value = null;
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
          size="large"
          form="update-profile-form"
          value="Submit"
        >
          Save
        </Button>
      </form>
    </Container>
  );
}
