import React from "react";

export default function CheckOutSuccess() {
  const params = new URLSearchParams(window.location.search);

  return <div> thanks!{params.get("session_id")}</div>;
}
