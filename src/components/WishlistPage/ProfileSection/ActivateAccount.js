import { Box, Button } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router";

import AnnouncementIcon from "@material-ui/icons/Announcement";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import useScreenSize from "../../../hooks/useScreenSize";
export default withRouter(function ActivateAccount(props) {
  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 600 },
    useStandard: false,
  });
  const activate = (data) => {
    props.history.push("/stripe_instructions");
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
      {props.finish
        ? "Finish setting up your account to receive funds. You have more steps to complete your payment setup."
        : "Set up your account to receive funds."}

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
});
