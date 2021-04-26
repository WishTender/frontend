import { Container, Paper, Button, Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { useState, useContext, useEffect } from "react";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import { UserContext } from "../../contexts/UserContext";

import StyledDialog from "../common/StyledDialog/StyledDialog";
import Form from "./Form";

const StyledMenuItem = withStyles((theme) => ({
  root: {
    borderBottom: "1px solid #e6e6e6",
    "&:last-of-type": {
      borderBottom: "none",
    },
  },
}))(MenuItem);

export default function AccountSettings() {
  const [dialog, setDialog] = useState(null);
  const { user } = useContext(UserContext);

  return (
    <Container style={{ maxWidth: "750px" }}>
      <Paper style={{ marginTop: "7vw" }}>
        <StyledMenuItem
          color="primary"
          onClick={() => {
            setDialog("email");
          }}
        >
          <ListItemText primary="Email" />
          {user.email}

          <ArrowRightIcon />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setDialog("password");
          }}
          color="primary"
        >
          <ListItemText primary="Password" />
          <ArrowRightIcon />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setDialog("payment-dashboard");
          }}
          color="primary"
        >
          <ListItemText primary="Payment Dashboard" />
          <ArrowRightIcon />
        </StyledMenuItem>
      </Paper>
      <StyledDialog onClose={() => setDialog(null)} open={dialog === "email"}>
        <Form info={{ currency: "USD", itemName: "Purse" }}></Form>
      </StyledDialog>
      <StyledDialog
        onClose={() => setDialog(null)}
        open={dialog === "password"}
      >
        password Update old
        <input type="text"></input>
        new
        <input type="text"></input>
      </StyledDialog>
      <StyledDialog
        onClose={() => setDialog(null)}
        open={dialog === "payment-dashboard"}
      >
        payment
      </StyledDialog>
    </Container>
  );
}
