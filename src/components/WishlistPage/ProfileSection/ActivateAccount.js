import { Box, Button } from "@material-ui/core";
import React from "react";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import useScreenSize from "../../../hooks/useScreenSize";
export default function ActivateAccount(props) {
  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 600 },
    useStandard: false,
  });
  const activate = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
    fetch(
      process.env.REACT_APP_BASE_URL + "/api/connectAccount/createConnect",
      {
        credentials: "include",
        method: "POST",
        headers,
      }
    )
      .then(async (response) => {
        if (response.status === 500) {
          let responseText = await response.text();
          throw new Error(responseText);
        }
        const json = await response.json();

        if (response.status === 409) {
          alert(
            json.message +
              " Call or email dash if you get this alert 773-425-8000 or dash@wishtender.com so she can fix it."
          );
        }
        if (response.status >= 200 && response.status < 300) {
          return (window.location.href = json.onboardLink);
        }
      })
      .catch(console.log);
  };
  return (
    <Box
      display="grid"
      style={{
        gridTemplateColumns: "20px auto auto",
        gridTemplateRows: "auto auto",
        padding: "4px",
        gridColumnGap: "4px",
        color: "white",
        boxShadow: "3px 3px 4px #00000052",
        background: "linear-gradient(to left, rgb(255 0 96), rgb(241 112 171))",
      }}
    >
      <AnnouncementIcon
        style={{
          gridArea: "1 / 1 / 2/ 1",
        }}
      />
      {props.finish ? (
        <>
          <span>
            <u>
              <b>Something went wrong</b>
            </u>
            . Call/text Dash (773-425-8000) or try again.
          </span>
        </>
      ) : (
        "Set up your account to receive funds."
      )}

      <div
        style={{
          gridArea: "2 / 2 / 2 / 3",
          fontSize: "clamp(.1em, 2.7vw, .9em)",
        }}
      >
        Your wishlist will be hidden from visitors until payments are activated.
      </div>
      <div
        style={{
          fontSize: ".8em",
          gridArea: "1 / 3 / 3 / 3",
          justifySelf: "end",
          alignSelf: "center",
        }}
      >
        <Button
          size="small"
          color="secondary"
          disableElevation
          variant="contained"
          onClick={activate}
        >
          {screenSize === "sm"
            ? props.finish
              ? "Finish Set Up"
              : "Set Up Payments"
            : ""}
          <ArrowForwardIosIcon color="primary" />
        </Button>
      </div>
    </Box>
  );
}
