import React from "react";
// just an example of how to connect to aws s3 bucket image. pretty easy- most of the work is on setting up aws correctly
export default function Image() {
  return (
    <img
      style={{ border: "5px solid green", width: "20%" }}
      src="https://wishtender.s3.us-east-2.amazonaws.com/image"
      alt="amazon s3"
    />
  );
}
