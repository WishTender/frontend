import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function SignupButton() {
  return (
    <Link to="/sign-up">
      <Button>Signup</Button>
    </Link>
  );
}
