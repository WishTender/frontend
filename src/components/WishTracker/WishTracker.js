import React, { useEffect, useState, useContext } from "react";
import { fetchGet, fetchPatchJson } from "../../scripts/fetchHelper";
import { UserContext } from "../../contexts/UserContext";
import {
  parseAliasCartPrices as parseOrderPrices,
  parsePrice,
  displayPrice,
  clientCurrency,
} from "../../scripts/helpers";
import { LocaleContext } from "../../contexts/LocaleContext";

const displayOrder = (order, currency, locale, setReply) => {
  let gifts = order.gifts;
  gifts = gifts.map((gift) => {
    return (
      <li key={order._id + "-" + gift.item._id}>
        <img src={gift.item.itemImage} alt={gift.item.itemName} />
        {gift.item.itemName} <br />
        QTY: {gift.qty} <br />
        total: {displayPrice(gift.price, currency, currency, 1, locale)}
        <br /> Purchase this wish: {gift.item.url}
      </li>
    );
  });
  return (
    <div id={`order-${order._id}`}>
      <ul>{gifts}</ul>total:{" "}
      {displayPrice(order.tender.amount, currency, currency, 1, locale)}
      <br />
      {order.tender.afterConversion && (
        <>
          {" "}
          You received{" "}
          {displayPrice(
            parsePrice(order.tender.afterConversion, currency),
            currency,
            currency,
            1,
            locale
          )}{" "}
          because there was a currency conversion. Sometimes our predicted
          exchange rates aren't the same as our payment processor's exchange
          rates so you may get a different amount.
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
          <button onClick={() => setReply(order)}>Send a reply</button>
        </>
      )}
    </div>
  );
};

export default function WishTracker() {
  const { user: currentUser } = useContext(UserContext);
  const clientLocale = useContext(LocaleContext);
  const [orders, setOrders] = useState(null);
  const [reply, setReply] = useState(null);
  const [refreshOrders, setRefreshOrders] = useState(null);

  useEffect(() => {
    if (currentUser || (refreshOrders && currentUser))
      fetchGet(
        `${process.env.REACT_APP_BASE_URL}/api/orders/${currentUser.aliases[0]}`,
        (orders) => {
          orders.map((order) => {
            parseOrderPrices(order);
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
      <div>
        {orders &&
          orders.map((order) => {
            return (
              <>
                <hr />{" "}
                {displayOrder(
                  order,
                  clientCurrency(currentUser),
                  clientLocale,
                  setReply
                )}
              </>
            );
          })}
      </div>
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
