import React, { useEffect, useState } from "react";

export default function CheckOutSuccess() {
  const [message, setMessage] = useState(null);
  const correctCurrency = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(
      process.env.REACT_APP_BASE_URL + "/api/connectAccount/correctCurrency",
      {
        credentials: "include",

        method: "PATCH",
        body: JSON.stringify(data),
        headers,
      }
    )
      .then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          return setMessage("You're account is set up and ready to use.");
        }
        const json = await res.json();
        setMessage(json.message);
      })
      .catch(console.log);
  };
  useEffect(() => {
    fetch(
      process.env.REACT_APP_BASE_URL + "/api/connectAccount/activateConnect",
      {
        credentials: "include",

        method: "PATCH",
      }
    )
      .then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          return setMessage("You're account is set up and ready to use.");
        }
        const json = await res.json();
        if (res.status >= 400 && res.status < 500) {
          setMessage(
            json.error === "Currency Conflict" ? (
              <>
                You're Stripe account is set to {json.currency} but there are
                items in your wishlist set to a different currency. Do you want
                to convert the prices?
                <button
                  onClick={() =>
                    correctCurrency({
                      changeValue: true,
                      currency: json.currency,
                    })
                  }
                >
                  Yes. Change currency and Automatically convert prices my
                  wishlist items
                </button>
                <button
                  onClick={() =>
                    correctCurrency({
                      changeValue: false,
                      currency: json.currency,
                    })
                  }
                >
                  No.Only change currency. I'll convert the prices myself.
                </button>
              </>
            ) : (
              json.message
            )
          );
        }
        throw new Error(json.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <> {message && message}</>;
}
