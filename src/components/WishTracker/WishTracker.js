import React, { useEffect, useState, useContext } from "react";
import { fetchGet, fetchPatchJson } from "../../scripts/fetchHelper";
import { UserContext } from "../../contexts/UserContext";
import ReplyToWish from "./ReplyToWish";
import {
  parseOrderPrices,
  parsePrice,
  displayPrice,
  clientCurrency,
} from "../../scripts/helpers";
import { LocaleContext } from "../../contexts/LocaleContext";
import { Link } from "react-router-dom"; // a comment (can be deleted)
import confetti from "canvas-confetti";
import theme from "../../theme";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {
  Box,
  ListSubheader,
  InputAdornment,
  Tooltip,
  Button,
  Container,
  Grid,
  TableBody,
  TableContainer,
  Accordion,
  AccordianSummary,
  List,
  ListItem,
  Divider,
  Collapse,
  ListItemText,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";
import HelpIcon from "@material-ui/icons/Help";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
import useStyles from "../../themeStyles";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import { NotificationContext } from "../../contexts/NotificationContext";
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
  currency,
  locale,
  setReply,
  reply,
  classes,
}) => {
  const notificationContext = useContext(NotificationContext);
  const userContext = useContext(UserContext);
  const openGift = async (e, callback) => {
    const { clientHeight, clientWidth } = document.documentElement;
    const eTop = window.pageYOffset + e.target.getBoundingClientRect().top;
    const eFromLeft =
      window.pageXOffset + e.target.getBoundingClientRect().left;
    let vel;
    if (clientWidth <= 850) {
      vel = (clientWidth / 850) * 45;
    } else {
      vel = 45;
    }
    let ang;
    if (vel < 45) {
      ang = (vel / 45) * 80 + 80;
    } else {
      ang = 160;
    }

    confetti({
      zIndex: 9000,
      angle: ang,
      startVelocity: vel,
      colors: [
        theme.palette.primary.main,
        theme.palette.primary.light,
        theme.palette.secondary.main,
        theme.palette.primary.light,
      ],
      origin: {
        x: eFromLeft / clientWidth,
        y: eTop / clientHeight,
      },
    });
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/orders/seen/${order._id}`,
      {
        credentials: "include",
        method: "PATCH",
        headers,
      }
    )
      .then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          const notifications = await notificationContext.getNotifications(
            userContext.user.aliases[0]
          );
          notificationContext.setNotifications(notifications);
          callback();
        } else {
          console.log(res.status);
        }
      })
      .catch(console.log);
  };
  const [open, setOpen] = useState(false);
  let gifts = order.gifts;
  gifts = gifts.map((gift) => {
    return (
      <TableRow key={order._id + "-" + gift.item._id}>
        <TableCell>
          <img width="60" src={gift.item.itemImage} alt={gift.item.itemName} />
          <p>{gift.item.itemName}</p>
        </TableCell>
        <TableCell>
          <Button
            size="small"
            color="primary"
            // variant="contained"
            component={Link}
            disableElevation
            to={gift.item.url}
          >
            Purchase
          </Button>
        </TableCell>
        <TableCell>{gift.qty} </TableCell>
        <TableCell>{gift.price}</TableCell>
      </TableRow>
    );
  });
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
                New wishtender!
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
                    openGift(e, () => {
                      setOpen(!open);
                    });
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
        </StyledListItem>
      )}

      <Collapse
        className={classes.collapse}
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <TableContainer className={classes.table}>
          <Table id={`order-${order._id}`}>
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="right"
                  style={{
                    paddingTop: theme.spacing(0.5),
                    paddingBottom: theme.spacing(0.5),
                  }}
                >
                  <Typography variant="caption">
                    Order ID: {order._id}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Wish</TableCell>
                <TableCell></TableCell>
                <TableCell>QTY</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gifts}

              <TableRow>
                <TableCell rowSpan={1} />
                <TableCell style={{ minWidth: "140px" }}>
                  Total Wishtender
                </TableCell>
                <TableCell align="right" colSpan={2}>
                  {order.tender.afterConversion ? (
                    <>
                      {order.tender.afterConversion}
                      <Tooltip
                        title={`You received ${order.tender.afterConversion} instead of ${order.tender.amount} because there
                      was a currency conversion. Sometimes our predicted
                      exchange rates aren't the same as our payment processor's
                      exchange rates so you may get a different amount. Please
                      text Dash (founder of WishTender) if you would like a
                      better solution 773-425-8000.`}
                      >
                        <HelpIcon
                          // fontSize="small"
                          style={{ fontSize: 16 }}
                          color="error"
                          aria-label="pricing information"
                        />
                      </Tooltip>
                    </>
                  ) : (
                    order.tender.amount
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                {/* <TableCell colSpan={1}></TableCell> */}
                <TableCell colSpan={4}>
                  {order.noteToWisher ? (
                    <>
                      <Typography variant="overline" display="block">
                        Tender's Note:
                      </Typography>
                      {order.noteToWisher.message}
                    </>
                  ) : (
                    "The tender didn't leave a note"
                  )}
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      color="primary"
                      variant="contained"
                      disableElevation
                      disabled={!!reply}
                      onClick={() => setReply(order)}
                    >
                      Reply
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
              {(order.noteToTender || reply) && (
                <TableRow>
                  <TableCell colSpan={4}>
                    {order.noteToTender ? (
                      <>
                        <Typography variant="overline" display="block">
                          Your Thank You Note:
                        </Typography>

                        {order.noteToTender.message}
                      </>
                    ) : (
                      reply && (
                        <ReplyToWish
                          to={reply.fromLine}
                          setReply={setReply}
                          setRefreshOrders={setRefreshOrders}
                          order={reply}
                        />
                      )
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </>
  );
};

function WishTracker(props) {
  const { user: currentUser } = useContext(UserContext);
  const clientLocale = useContext(LocaleContext);
  const [orders, setOrders] = useState(null);
  const [reply, setReply] = useState(null);
  const [refreshOrders, setRefreshOrders] = useState(null);
  const classes = useStyles(props);

  useEffect(() => {
    if (currentUser || (refreshOrders && currentUser))
      fetchGet(
        `${process.env.REACT_APP_BASE_URL}/api/orders/${currentUser.aliases[0]}`,
        (orders) => {
          orders.reverse().map((order) => {
            parseOrderPrices(order, clientLocale);
            return order;
          });
          setOrders(orders);
          if (refreshOrders) setRefreshOrders(false);
        }
      );
  }, [currentUser, refreshOrders]);

  return (
    <Container maxWidth="md" style={{ marginTop: "7vw", paddingBottom: "7vw" }}>
      {currentUser && (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" style={{ margin: "0 8px" }}>
            Wish-Tracker
          </Typography>
          <Button
            color="primary"
            // component={Button}
            style={{ fontWeight: "500" }}
            // variant="outlined"
            disableElevation
            href="http://localhost:4000/api/stripe/login"
          >
            Payment Dashboard <RightIcon color="primary" />
          </Button>
        </Box>
      )}
      <Paper style={{ marginTop: "2vw" }}>
        <List
          component="nav"
          aria-labelledby="wishes-granted-subheader"
          subheader={
            <ListSubheader
              style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
              component="div"
              id="wishes-granted-subheader"
            >
              Transactions: {orders && orders.length}
              {orders && (
                <span style={{ float: "right", display: "block" }}>
                  New: {orders.filter((order) => order.seen === false).length}
                </span>
              )}
              {/* <Typography style={{ float: "left" }} display="inline">
              Transactions: {orders && orders.length}
              </Typography>
              <Typography
              align="right"
              style={{ float: "right" }}
              display="inline"
              >
              {currentUser.email}
            </Typography> */}
            </ListSubheader>
          }
        >
          {orders &&
            orders.map((order) => {
              return (
                <DisplayOrder
                  setRefreshOrders={setRefreshOrders}
                  order={order}
                  currency={clientCurrency(currentUser)}
                  locale={clientLocale}
                  setReply={setReply}
                  reply={reply}
                  classes={classes}
                />
              );
            })}
        </List>
      </Paper>
    </Container>
  );
}

export default withStyles(styles)(WishTracker);
