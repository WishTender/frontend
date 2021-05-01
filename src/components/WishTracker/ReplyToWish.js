import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";
import { fetchPatchJson } from "../../scripts/fetchHelper";
import { useForm } from "react-hook-form";

export default function ReplyToWish(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    fetchPatchJson(
      {
        message: data.message || "test",
      },
      `${process.env.REACT_APP_BASE_URL}/api/orders/reply/${props.order._id}`,
      (res) => {
        if (res.messageSent) {
          props.setReply(null);
          props.setRefreshOrders(true);
        }
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography align="left">Reply to {props.to}</Typography>
      <TextField
        style={{ width: "100%", marginTop: "8px" }}
        id="outlined-multiline-static"
        label="Message"
        name="message"
        ref={register()}
        multiline
        rows={10}
        variant="filled"
      ></TextField>
      <Button
        type="submit"
        name="send"
        color="primary"
        disableElevation
        variant="contained"
        style={{ marginTop: "8px", float: "right" }}
      >
        Send
      </Button>
      <Button
        name="close"
        onClick={() => props.setReply(null)}
        disableElevation
        style={{ marginTop: "8px", marginRight: "8px", float: "right" }}
      >
        Close
      </Button>
    </form>
  );
}
