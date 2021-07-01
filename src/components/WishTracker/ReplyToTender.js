import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";
import { fetchPatchJson } from "../../scripts/fetchHelper";
import { useForm } from "react-hook-form";
import ProgressButton from "../common/ProgressButton";
import themeStyles from "../../themeStyles";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => {
  return {
    reply_buttons: {
      marginTop: "8px",
      float: "right",
    },
  };
});
export default function ReplyToTender(props) {
  const [reqStatus, setReqStatus] = useState(null);
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setReqStatus("loading");
    fetchPatchJson(
      {
        message: data.message,
      },
      `${process.env.REACT_APP_BASE_URL}/api/orders/reply/${props.order._id}`,
      (res) => {
        if (res.messageSent) {
          setReqStatus("success");

          props.setReply(null);
          props.setRefreshOrders(true);
        }
        setReqStatus("error");
      }
    );
  };
  const { ref: messageRef, ...messageReg } = register("message");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography align="left">Reply to {props.to}</Typography>
      <TextField
        style={{ width: "100%", marginTop: "8px" }}
        id="outlined-multiline-static"
        label="Message"
        name="message"
        {...messageReg}
        inputRef={messageRef}
        multiline
        rows={10}
        variant="filled"
      ></TextField>
      {/* <Button
        type="submit"
        color="primary"
        disableElevation
        variant="contained"
        style={{ marginTop: "8px", float: "right" }}
      >
        Send
      </Button> */}
      <ProgressButton
        type="submit"
        loading={reqStatus === "loading"}
        error={reqStatus === "error"}
        success={reqStatus === "success"}
        successMessage="Sent"
        wrapperClassName={classes.reply_buttons}
        // wrapperClassName={
        //   screenSize === "xs"
        //     ? themeClasses.dialogSubmitMobileProgressWrap
        //     : themeClasses.dialogSubmitProgressWrap
        // }
        // className={
        //   screenSize === "xs"
        //     ? themeClasses.dialogSubmitMobileProgress
        //     : themeClasses.dialogSubmitProgress
        // }
      >
        Send
      </ProgressButton>
      <Button
        onClick={() => props.setReply(null)}
        disableElevation
        style={{ marginTop: "8px", marginRight: "8px", float: "right" }}
      >
        Close
      </Button>
    </form>
  );
}
