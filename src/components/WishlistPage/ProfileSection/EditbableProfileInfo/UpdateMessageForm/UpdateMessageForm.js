import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles({
  root: {
    padding: "0",
    "& .MuiInputBase-input": {
      padding: "5px 13px ",
    },
  },
});

/**
 * Renders a <UpdateMessageForm /> component
 * @param  props
 * @param  props.onClose
 * @param  props.handleUpdateWishlistMessage
 * @param  props.wishlistMessage
 */

export default function UpdateMessageForm({
  wishlistMessage,
  handleUpdateWishlistMessage,
  onClose,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const classes = useStyles();
  const onSubmit = (data) => {
    if (data.message) handleUpdateWishlistMessage(data.message);
    onClose(false);
  };
  const { ref: messageRef, ...messageReg } = register("message", {
    maxLength: {
      value: 29,
      message: "message must be less than 30 characters",
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <TextField
        name="message"
        className={classes.root}
        defaultValue={wishlistMessage}
        variant="outlined"
        style={{ width: "60%" }}
        spellCheck="false"
        {...messageReg}
        inputRef={messageRef}
      />

      <IconButton type="submit" size="small" aria-label="edit">
        <CheckIcon />
      </IconButton>
      {errors.message?.message && (
        <FormHelperText id="handle-helper-text">
          {errors.message?.message}
        </FormHelperText>
      )}
    </form>
  );
}
