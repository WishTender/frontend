import React, { useEffect, useState, useContext } from "react";
import { fetchGet, fetchPatchJson } from "../../scripts/fetchHelper";
import { UserContext } from "../../contexts/UserContext";
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
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  highlight: {
    background: theme.palette.primary.light,
    "&:hover": {
      background: theme.palette.primary.light,
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
  classes,
}) => {
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
        <StyledListItem button divider className={classes.new}>
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
        <StyledListItem button divider className={open && classes.highlight}>
          <ListItemText
            primary={`From: ${order.fromLine}`}
            secondary={new Date(order.paidOn).toLocaleString()}
          />
          <ListItemText
            align="right"
            primary={
              order.noteToTender && order.noteToTender.sent
                ? `Thank you note sent${order.noteToTender.sent}`
                : "No reply sent"
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
                <TableCell>Wish</TableCell>
                <TableCell></TableCell>
                <TableCell>QTY</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gifts}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Total Tender Received</TableCell>
                <TableCell align="right">
                  {order.tender.afterConversion ? (
                    <>
                      {order.tender.afterConversion}
                      <Tooltip
                        title={`You received ${order.tender.afterConversion} instead of ${order.tender.amount} because there
                      was a currency conversion. Sometimes our predicted
                      exchange rates aren't the same as our payment processor's
                      exchange rates so you may get a different amount. Please
                      text Dash (founder of WishTender) if you would like a
                      better solution 773-425-800.`}
                      >
                        <HelpIcon aria-label="pricing information" />
                      </Tooltip>
                    </>
                  ) : (
                    order.tender.amount
                  )}
                </TableCell>
              </TableRow>
              Tender: {order.fromLine || "Anonymous"}
              <br />
              {order.noteToWisher
                ? `Tender's Note: 
                  ${order.noteToWisher.message}`
                : "The tender didn't leave a note"}
              <br></br>
              {order.noteToTender ? (
                `Your Thank You Note: ${order.noteToTender.message}`
              ) : (
                <>
                  <br></br>
                  <button onClick={() => setReply(order)}>Send a reply</button>
                </>
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
    <Container maxWidth="md" style={{ marginTop: "7vw" }}>
      {currentUser && (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" style={{ margin: "0 8px" }}>
            Wish-Tracker
          </Typography>
          <Button
            color="primary"
            component={Link}
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
                  classes={classes}
                />
              );
            })}
        </List>
      </Paper>
      {reply && (
        <div>
          Reply to: {reply._id} {reply.buyerInfo.fromLine}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchPatchJson(
                {
                  message: "test reply text",
                },
                `${process.env.REACT_APP_BASE_URL}/api/orders/reply/${reply._id}`,
                (res) => {
                  if (res.messageSent) setRefreshOrders(true);
                }
              );
            }}
          >
            <input type="text" />
            <input type="submit" value="Send" />
          </form>
        </div>
      )}
    </Container>
  );
}

export default withStyles(styles)(WishTracker);
