import { Container, Paper, Button, Dialog, Link } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { useState, useContext, useEffect } from "react";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import { fetchDelete } from "../../scripts/fetchHelper";
import { UserContext } from "../../contexts/UserContext";
import SendResetPassword from "../ResetPassword/SendResetPassword.js";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";
import Form from "./Form";
import { withRouter } from "react-router";
import UpdateEmail from "./UpdateEmail";
import DeleteAccount from "./DeleteAccount";
const paymentLink = `${process.env.REACT_APP_BASE_URL}/api/stripe/login?from=account-settings`;

const StyledMenuItem = withStyles((theme) => ({
  root: {
    borderBottom: "1px solid #e6e6e6",
    "&:last-of-type": {
      borderBottom: "none",
    },
  },
}))(MenuItem);

export default withRouter(function AccountSettings(props) {
  const [dialog, setDialog] = useState(null);
  const { user, getUser, setUser } = useContext(UserContext);

  return (
    //collapsing margins, need display flex
    <Container
      style={{
        maxWidth: "750px",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
      }}
    >
      <Paper style={{ marginTop: "7vw" }}>
        <StyledMenuItem
          href={paymentLink}
          style={{ borderBottom: "1px solid #e6e6e6" }}
          component={Link}
          color="primary"
        >
          <ListItemText primary="Payment Dashboard" />
          <ArrowRightIcon />
        </StyledMenuItem>

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
            setDialog("delete");
          }}
          color="primary"
        >
          <ListItemText primary="Delete Account" />
          <ArrowRightIcon />
        </StyledMenuItem>
      </Paper>
      <StyledDialog onClose={() => setDialog(null)} open={dialog === "email"}>
        <UpdateEmail
          onClose={async () => {
            setDialog(null);
            setUser(await getUser());
          }}
        />
      </StyledDialog>
      <StyledDialog
        onClose={() => setDialog(null)}
        open={dialog === "password"}
      >
        <SendResetPassword />
      </StyledDialog>
      <StyledDialog
        onClose={() => setDialog(null)}
        open={dialog === "payment-dashboard"}
      >
        payment
      </StyledDialog>
      <StyledDialog onClose={() => setDialog(null)} open={dialog === "delete"}>
        <DeleteAccount
          user={user}
          onClose={async () => {
            props.history.push("/");
            setUser(await getUser());
          }}
        />
      </StyledDialog>
      <StyledDialog
        onClose={() => setDialog(null)}
        open={dialog === "change email"}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await fetchDelete(
              `${process.env.REACT_APP_BASE_URL}/api/users/${user._id}`,
              async (res) => {
                if (res.status === 200) {
                  alert("deleted");
                }
              }
            );
          }}
        >
          Are you sure you want to delete your account?
          <Button onClick={() => setDialog(null)}>Cancel</Button>{" "}
          <Button type="submit">Delete</Button>
        </form>
      </StyledDialog>
    </Container>
  );
});
