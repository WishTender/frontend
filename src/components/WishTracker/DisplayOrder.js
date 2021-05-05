import React, { useState, useContext } from "react";
import theme from "../../theme";

import { UserContext } from "../../contexts/UserContext";
import openGift from "./openGift";
import { withStyles } from "@material-ui/core/styles";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import { NotificationContext } from "../../contexts/NotificationContext";

import {
  ListItem,
  Button,
  ListItemText,
  IconButton,
  Typography,
} from "@material-ui/core";
import OrderDetails from "./OrderDetails";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  highlight: {
    border: "1px solid " + theme.palette.primary.light,
    background: theme.palette.primary.extraLight,
    "&:hover": {
      background: theme.palette.primary.extraLight,
    },
  },
  collapse: {
    border: "1px solid " + theme.palette.primary.main,
    borderLeft: `1px solid ${theme.palette.primary.light}`,
    borderTop: `0px`,
  },
  openButton: {
    background: "white",
    fontWeight: "900",
    color: theme.palette.primary.main,
  },
  new: {
    margin: "0 0 4px 0",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    background: theme.palette.primary.mainGradient,
  },
});

const StyledListItem = withStyles((theme) => ({
  root: {
    "&:last-of-type": {
      borderBottom: "none",
    },
  },
}))(ListItem);
const DisplayOrder = ({
  setRefreshOrders,
  order,

  classes,
  screen,
}) => {
  const userContext = useContext(UserContext);
  const notificationContext = useContext(NotificationContext);

  const [open, setOpen] = useState(false);

  return (
    <>
      {!order.seen ? (
        <StyledListItem
          style={open ? { marginBottom: 0 } : null}
          button
          divider
          className={classes.new}
        >
          <ListItemText
            // disableTypography
            primary={
              <Typography
                style={{
                  color: "yellow",
                  fontWeight: 900,
                  fontSize: "1.3em",
                }}
              >
                New Granted Wish!
              </Typography>
            }
            secondary={
              <Typography style={{ fontWeight: 900, color: "white" }}>
                From: {order.fromLine}
              </Typography>
            }
          />
          <Button
            variant="contained"
            className={classes.openButton}
            aria-label="expand row"
            size="small"
            onClick={
              !open
                ? (e) => {
                    openGift(
                      e,
                      () => {
                        setOpen(!open);
                      },
                      userContext,
                      notificationContext,
                      order._id
                    );
                  }
                : () => {
                    setOpen(!open);
                    setRefreshOrders(true);
                  }
            }
          >
            {open ? "Close" : "Open"}
          </Button>
        </StyledListItem>
      ) : (
        <StyledListItem
          onClick={() => setOpen(!open)}
          button
          divider
          className={open && classes.highlight}
        >
          <ListItemText
            primary={`From: ${order.fromLine}`}
            secondary={new Date(order.paidOn).toLocaleString()}
          />
          {screen === "xs" ? (
            <div>
              <div>
                <Typography
                  align="right"
                  style={{
                    fontSize: "0.8em",
                    position: "absolute",
                    top: theme.spacing(0.8),
                    right: theme.spacing(0.9),
                  }}
                >
                  {(!order.noteToTender ||
                    (order.noteToTender && !order.noteToTender.sent)) &&
                    "No reply sent"}
                </Typography>
              </div>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <UpIcon /> : <DownIcon />}
              </IconButton>
            </div>
          ) : (
            <>
              <ListItemText
                align="right"
                primary={
                  (!order.noteToTender ||
                    (order.noteToTender && !order.noteToTender.sent)) &&
                  "No reply sent"
                }
              />
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <UpIcon /> : <DownIcon />}
              </IconButton>
            </>
          )}
        </StyledListItem>
      )}

      <OrderDetails
        setRefreshOrders={setRefreshOrders}
        open={open}
        classes={classes}
        order={order}
        screen={screen}
      />
    </>
  );
};

export default withStyles(styles)(DisplayOrder);
