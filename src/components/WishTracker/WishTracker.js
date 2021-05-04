import React, { useEffect, useState, useContext } from "react";
import { WishlistContext } from "./WishlistContext";
import { fetchGet } from "../../scripts/fetchHelper";
import { UserContext } from "../../contexts/UserContext";
import DisplayOrder from "./DisplayOrder";
import {
  parseOrderPrices,
  parsePrice,
  displayPrice,
  clientCurrency,
} from "../../scripts/helpers";
import { LocaleContext } from "../../contexts/LocaleContext";
import Paper from "@material-ui/core/Paper";
import {
  Box,
  ListSubheader,
  Button,
  Container,
  List,
  Typography,
} from "@material-ui/core";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";
import useSmallScreen from "../../hooks/useSmallScreen";

function WishTracker(props) {
  const smallScreen = useSmallScreen();
  const { user: currentUser } = useContext(UserContext);
  const clientLocale = useContext(LocaleContext);
  const { getWishlist } = useContext(WishlistContext);
  const [orders, setOrders] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  // const [refreshWishlist, setRefreshWishlist] = useState(null);
  // const [reply, setReply] = useState(null);
  const [refreshOrders, setRefreshOrders] = useState(null);

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
  }, [clientLocale, currentUser, refreshOrders]);

  useEffect(() => {
    if (currentUser)
      (async () => {
        setWishlist(await getWishlist(currentUser.wishlists[0]));
      })();
  }, [currentUser, getWishlist]);

  return (
    <Container maxWidth="md" style={{ marginTop: "7vw", paddingBottom: "7vw" }}>
      <WishlistContext.Provider value={{ wishlist, setWishlist, getWishlist }}>
        {currentUser &&
          (!smallScreen ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
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
          ) : (
            <Box
              // display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
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
              <Typography variant="h6" style={{ margin: "0 8px" }}>
                Wish-Tracker
              </Typography>
            </Box>
          ))}
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
                    screen={smallScreen && "xs"}
                  />
                );
              })}
          </List>
        </Paper>
      </WishlistContext.Provider>
    </Container>
  );
}

export default WishTracker;
