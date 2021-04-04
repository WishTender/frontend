import React from "react";

export default function ActivateAccount() {
  const activate = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
    fetch(
      process.env.REACT_APP_BASE_URL + "/api/connectAccount/createConnect",
      {
        method: "POST",
        headers,
      }
    )
      .then(async (response) => {
        if (response.status === 500) {
          let responseText = await response.text();
          throw new Error(responseText);
        }
        const json = await response.json();

        if (response.status >= 200 && response.status < 300) {
          return (window.location.href = json.onboardLink);
        }
      })
      .catch(console.log);
  };
  return <button onClick={activate}>Activate</button>;
}
