import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

/**
 * Renders a <WishForm /> component
 * @param  props
 * @param  props.info
 * @param  props.onClose
 **/
export default function Form(props) {
  const [email, setEmail] = useState("");
  const [verificationSent, setVerificationSent] = useState("");

  useEffect(() => {
    setEmail(props.email);
  }, [props.info]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async () => {
    const response = await fetch("/api/email"); // not real endpoint
    const user = await response.json();
  };
  return (
    //     We ask a user to put in their new email.
    // Cognito sends them a verification code.
    // They enter the code and we confirm that their email has been changed.
    <form
      autoComplete="off"
      style={props.disabled ? { opacity: ".3", pointerEvents: "none" } : {}}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography>Change Email</Typography>
      <FormControl error={errors.email ? true : false}>
        <TextField
          // inputRef={register()}
          name="email"
          variant="outlined"
          value={email}
          label="Update Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <FormHelperText>{errors.email?.message}</FormHelperText>
      </FormControl>
      {verificationSent && (
        <FormControl error={errors.email ? true : false}>
          <TextField
            // inputRef={register()}
            name="email"
            variant="outlined"
            value={email}
            label="Update Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormHelperText>{errors.email?.message}</FormHelperText>
        </FormControl>
      )}

      <Button
        disableElevation={true}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
      >
        Update
      </Button>
    </form>
  );
}
