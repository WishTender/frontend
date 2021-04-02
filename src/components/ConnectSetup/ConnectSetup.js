import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CountryOptions from "../CountryOptions/CountryOptions";

export default function ConnectSetup() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  useEffect(() => {
    // get account info- was stripe setup?
    fetch("/api/connectAccount/currentAccount").then(async (res) => {
      const json = await res.json();
      alert(JSON.stringify(json));
    });
  }, []);

  const correctCurrency = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch("/api/connectAccount/correctCurrency", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers,
    })
      .then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          return alert("You're account is ready to set up.");
        }
        const json = await res.json();
        alert(json.message);
      })
      .catch(console.log);
  };

  const onSubmit = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
    fetch("/api/connectAccount/createConnect", {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    })
      .then(async (response) => {
        if (response.status === 500) {
          let responseText = await response.text();
          throw new Error(responseText);
        }
        const json = await response.json();

        if (response.status >= 200 && response.status < 300) {
          return (window.location.href = json.onboardLink);
        }
        if (response.status >= 400 && response.status < 500) {
          if (json.error === "Currency Conflict") {
            setError(
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
                  Yes. Change currency and convert prices of my wishlist items
                  based on exchange rates.
                </button>
                <button
                  onClick={() =>
                    correctCurrency({
                      changeValue: false,
                      currency: json.currency,
                    })
                  }
                >
                  No. Only change currency. I'll convert the prices myself.
                </button>
              </>
            );
          } else {
            setError(json.message);
          }
        }
        throw new Error(data.json.message);
      })
      .catch(console.log);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        Account Country:{" "}
        <select
          type="select"
          placeholder="Country"
          name="country"
          ref={register({
            required: "Country Required",
          })}
        >
          <CountryOptions />
        </select>
        <input type="submit" value="Setup Payments" />
      </form>

      {error && <>{error}</>}
    </>
  );
}
