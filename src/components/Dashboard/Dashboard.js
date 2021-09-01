import React, { useEffect, useState } from "react";
import Collapse from "@material-ui/core/Collapse";

export default function Dashboard() {
  const [users, setUsers] = useState(null);
  const [open, setOpen] = useState(null);
  useEffect(() => {
    (async () => {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, {
        credentials: "include",
      })
        .then(async (res) => {
          const json = await res.json();
          setUsers(json);
        })
        .catch((err) => {});
    })();
  }, []);

  const getActivityLevel = (hourlies) => {
    // not really correct. If there are 7 hourly checkins in one day it will say 1/day I think
    hourlies = [...hourlies.map((hour) => new Date(hour), new Date())];
    const milis = hourlies
      .reduce((a, c, i, arr) => {
        if (i === arr.length - 1) {
          return a;
        }
        return [...a, arr[i + 1] - c];
      }, [])
      .reduce(function (avg, value, _, { length }) {
        return avg + value / length;
      }, 0);

    const daily = 86400000;

    const weekly = daily * 7;

    const monthly = daily * 30;

    const biweekly = (daily * 7) / 2;

    const bimonthly = (daily * 30) / 2;

    let activityLevel;

    if (milis <= daily) {
      activityLevel = "daily";
    } else if (milis <= biweekly) {
      activityLevel = "biweekly";
    } else if (milis <= weekly) {
      activityLevel = "weekly";
    } else if (milis <= bimonthly) {
      activityLevel = "bimonthly";
    } else if (milis <= monthly) {
      activityLevel = "monthly";
    } else {
      activityLevel = "less than 1/month";
    }

    return activityLevel;
  };
  const copy = (id) => {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

  return (
    <>
      {users && (
        <div>
          <h3>{users && users.length} Users </h3>
          <h3>
            {users && users.reduce((a, c) => c.orders?.length + a || a, 0)}{" "}
            Orders{" "}
          </h3>
          <button onClick={() => setOpen(!open)}>show orders</button>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <p>price is in smallest units (pennies if usd) </p>
            {(() => {
              const orders = users.reduce(
                (a, c) => (c.orders?.length ? [...c.orders, ...a] : a),
                []
              );
              return orders.map((order) => {
                let items = Object.keys(order.cart.items);
                let alias = order.cart.alias.handle;
                return items.map((id) => {
                  const item = order.cart.items[id].item;
                  return (
                    <div
                      style={{
                        display: "inline-block",
                        border: "1px solid pink",
                        margin: "10px",
                        width: "200px",
                      }}
                    >
                      to: <a href={"/" + alias}>{alias}</a>
                      <p>{item.itemName}</p>
                      <p>
                        price: {item.price}
                        {item.currency}
                      </p>
                      <img
                        alt=""
                        width="50"
                        height="50"
                        src={item.itemImage}
                      ></img>
                    </div>
                  );
                });
              });
            })()}
          </Collapse>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              padding: "10px",
            }}
          >
            {users &&
              users.map((user) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      border: "3px solid #2196F3",
                      padding: "10px",
                    }}
                  >
                    <img
                      alt=""
                      width="50"
                      height="50"
                      src={
                        user.aliases[0]?.profileImage ||
                        `${process.env.REACT_APP_BASE_URL}/data/images/profileImages/default_profileimage.png`
                      }
                    ></img>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        {(() => {
                          const d = new Date(user.createdAt);
                          return `${
                            d.getMonth() + 1
                          }/${d.getDate()}/${d.getFullYear()}`;
                        })()}
                      </div>
                      <div>
                        {user.wishlists[0]?.wishlistItems?.length ? (
                          <span
                            style={{ color: "#2296f3", fontWeight: "bold" }}
                          >
                            {
                              user.wishlists[0]?.wishlistItems.filter(
                                (i) => !i.deleted
                              ).length
                            }{" "}
                            Items
                          </span>
                        ) : (
                          "No items"
                        )}
                      </div>
                      <div>
                        {user.stripeAccountInfo?.activated ? (
                          <span
                            style={{ color: "limegreen", fontWeight: "bold" }}
                          >
                            Activated
                          </span>
                        ) : (
                          "Not Activated"
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline" }}>
                        <div
                          style={{ fontSize: ".8em" }}
                          id={"email" + user._id}
                        >
                          {user.email}{" "}
                        </div>
                        <button onClick={() => copy("email" + user._id)}>
                          copy
                        </button>
                      </div>
                      <div>orders: {user.orders?.length}</div>{" "}
                      <div>
                        last hour active:{" "}
                        {(() => {
                          if (user.userActivity?.hourly) {
                            const d = new Date(
                              user.userActivity.hourly[
                                user.userActivity.hourly.length - 1
                              ]
                            );
                            return `${
                              d.getMonth() + 1
                            }/${d.getDate()}/${d.getFullYear()} ${d.getHours()} TZ:+${
                              d.getTimezoneOffset() / 60
                            }`;
                          }
                          return "No info";
                        })()}
                      </div>
                      <div>
                        signup date:{" "}
                        {(() => {
                          if (user.createdAt) {
                            const d = new Date(user.createdAt);
                            return `${
                              d.getMonth() + 1
                            }/${d.getDate()}/${d.getFullYear()} ${d.getHours()} TZ:+${
                              d.getTimezoneOffset() / 60
                            }`;
                          }
                          return "No info";
                        })()}
                      </div>
                      <div>
                        {user.aliases.length && (
                          <a href={"/" + user.aliases[0].handle}>
                            {user.aliases[0].handle}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
