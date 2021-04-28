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

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {
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
import { makeStyles } from "@material-ui/core/styles";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
const useStyles = makeStyles((theme) => ({
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
  new: {
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    background: theme.palette.primary.mainGradient,
  },
}));
const DisplayOrder = ({ order, currency, locale, setReply, classes }) => {
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
    <Grid item xs={12}>
      <Container>
        {!order.seen ? (
          <ListItem button divider className={classes.new}>
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
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {open ? "Close" : "Open"}
            </Button>
          </ListItem>
        ) : (
          <ListItem button divider className={open && classes.highlight}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <UpIcon /> : <DownIcon />}
            </IconButton>
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
          </ListItem>
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
                    {order.tender.afterConversion
                      ? order.tender.afterConversion
                      : order.tender.amount}
                  </TableCell>
                </TableRow>
                total: <br />
                {order.tender.afterConversion && (
                  <>
                    {" "}
                    You received {order.tender.afterConversion}
                    because there was a currency conversion. Sometimes our
                    predicted exchange rates aren't the same as our payment
                    processor's exchange rates so you may get a different
                    amount.
                  </>
                )}
                <br />
                Tender: {order.fromLine || "Anonymous"}
                <br />
                {order.noteToWisher
                  ? `Tender's Note: 
                  ${order.noteToWisher}`
                  : "The wish tender didn't leave a note"}
                <br></br>
                {order.noteToTender ? (
                  `Your Thank You Note: ${order.noteToTender}`
                ) : (
                  <>
                    <br></br>
                    <button onClick={() => setReply(order)}>
                      Send a reply
                    </button>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </Container>
    </Grid>
  );
};

export default function WishTracker() {
  const { user: currentUser } = useContext(UserContext);
  const clientLocale = useContext(LocaleContext);
  const [orders, setOrders] = useState(null);
  const [reply, setReply] = useState(null);
  const [refreshOrders, setRefreshOrders] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (currentUser || (refreshOrders && currentUser))
      fetchGet(
        `${process.env.REACT_APP_BASE_URL}/api/orders/${currentUser.aliases[0]}`,
        (orders) => {
          orders.map((order) => {
            parseOrderPrices(order, clientLocale);
            return order;
          });
          setOrders(orders);
          if (refreshOrders) setRefreshOrders(false);
        }
      );
  }, [currentUser, refreshOrders]);

  return (
    <div>
      <div>wish tracker</div>
      {currentUser && (
        <>
          <p>{currentUser.username}</p>
          <a href="http://localhost:4000/api/stripe/login">
            Go to Payment Dashboard
          </a>
        </>
      )}
      <h2>Granted Wishes</h2>

      <List component="nav">
        {orders &&
          orders.map((order) => {
            return (
              <DisplayOrder
                order={order}
                currency={clientCurrency(currentUser)}
                locale={clientLocale}
                setReply={setReply}
                classes={classes}
              />
            );
          })}
      </List>
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
    </div>
  );
}
