import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [users, setUsers] = useState(null);
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
    hourlies = hourlies.map((hour) => new Date(hour));
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
    <div>
      <h3>{users && users.length} Users </h3>
      <h3>
        {users && users.reduce((a, c) => c.orders?.length + a || a, 0)} Orders{" "}
      </h3>
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
                      <span style={{ color: "#2296f3", fontWeight: "bold" }}>
                        {user.wishlists[0].wishlistItems.length} Items
                      </span>
                    ) : (
                      "No items"
                    )}
                  </div>
                  <div>
                    {user.stripeAccountInfo?.activated ? (
                      <span style={{ color: "limegreen", fontWeight: "bold" }}>
                        Activated
                      </span>
                    ) : (
                      "Not Activated"
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <div style={{ fontSize: ".8em" }} id={"email" + user._id}>
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
                    activity average:{" "}
                    {user.userActivity?.hourly
                      ? getActivityLevel(user.userActivity.hourly)
                      : "No data"}
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
  );
}
