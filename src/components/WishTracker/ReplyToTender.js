import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import {
  getImage,
  base64StringtoFile,
  blobUrlToBlob,
} from "../common/Crop/ReactEasyCrop/utils";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { fetchPatchJson } from "../../scripts/fetchHelper";
import { useForm } from "react-hook-form";
import ProgressButton from "../common/ProgressButton";
import themeStyles from "../../themeStyles";
import { makeStyles } from "@material-ui/core/styles";
import ImageIcon from "@material-ui/icons/Image";
import FileInputWrapper from "../common/FileInputWrapper/FileInputWrapper";

export default function ReplyToTender(props) {
  const [attachedImage, setAttachedImage] = useState(null);
  const [border, setBorder] = useState(null);
  const [textArea, setTextArea] = useState("");

  const useStyles = makeStyles((theme) => {
    return {
      cell1_xs: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(0),
        "& .MuiBox-root": { maxWidth: "250px" },
      },
      message: {
        "& textarea": { height: "100%" },
        "& .MuiInputBase-root": {
          paddingTop: border,
          height: "280px",
        },
      },
    };
  });

  const [reqStatus, setReqStatus] = useState(null);
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (
      (!attachedImage && data.message === "") ||
      (!attachedImage && !data.message)
    )
      return alert("Your message is empty. Please input a message or image.");
    setReqStatus("loading");
    // const blob = await blobUrlToBlob(attachedImage);
    if (attachedImage) {
      const blob = await fetch(attachedImage).then((r) => r.blob());
      data.imageAttachment = blob;
    }
    const fd = new FormData();
    const dataArray = Object.entries(data);
    dataArray.forEach((datum) => fd.append(datum[0], datum[1]));
    const headers = new Headers();
    // headers.append("CSRF-Token", user.csrfToken);
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/orders/reply/${props.order._id}`,
      {
        credentials: "include",
        method: "PATCH",
        body: fd,
        headers,
      }
    )
      .then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          const json = await res.json();
          if (json.messageSent || json.imageAttachment) {
            setReqStatus("success");

            props.setReply(null);
            props.setRefreshOrders(true);
            return;
          }
        }
        if (res.status >= 500 && res.status < 600) {
          const text = await res.text();
          alert(`Internal 500 Error: ${text}`);
        }
        setReqStatus("error");
        return;
      })
      .catch((err) => {
        alert(err.message ? err.message : err);
      });
    // setReqStatus("error");
    // fetchPatchJson(
    //   {
    //     message: data.message,
    //   },
    //   `${process.env.REACT_APP_BASE_URL}/api/orders/reply/${props.order._id}`,
    // );
  };
  const { ref: messageRef, ...messageReg } = register("message");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography align="left">Reply to {props.to}</Typography>

      <div>
        {attachedImage && (
          <div
            style={{
              position: "absolute",
              zIndex: 8,
              display: "flex",
              flexDirection: "column",
              alignContent: "flex-start",
              padding: "40px 0 0 10px",
            }}
          >
            <img
              height="130"
              src={attachedImage}
              alt="user attached media"
            ></img>
            <Button
              onClick={() => {
                setAttachedImage(null);
                setBorder(null);
              }}
            >
              Remove
            </Button>
          </div>
        )}
        <TextField
          className={classes.message}
          component={Box}
          style={{ width: "100%" }}
          id="outlined-multiline-static"
          label="Message"
          name="message"
          {...messageReg}
          inputRef={messageRef}
          multiline
          rows={10}
          variant="filled"
        ></TextField>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <FileInputWrapper
          handleNewImageSrc={(img) => {
            setAttachedImage(img);
            setBorder(200);
          }}
        >
          <div>
            <Tooltip title="Attach Image" aria-label="Attach Image">
              <IconButton onClick={() => {}} size="medium">
                <ImageIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        </FileInputWrapper>
        <Button
          onClick={() => {
            props.setReply(null);
            setAttachedImage(null);
          }}
          disableElevation
        >
          Close
        </Button>
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
      </div>
    </form>
  );
}
