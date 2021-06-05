import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Link,
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  Box,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

import { useForm } from "react-hook-form";
import React, { useState } from "react";
import useSmallScreen from "../../hooks/useSmallScreen";
import theme from "../../theme";
import Gift from "./Gift";
import { fetchPostJson } from "../../scripts/fetchHelper";
import DisplayPrice from "../common/DisplayPrice";
const TenderInfoInputs = ({ cart, register }) => {
  const { ref: fromLineRef, ...fromLineReg } = register("fromLine", {
    maxLength: {
      value: 60,
      message: `From line must be less than ${60 + 1} characters`,
    },
  });
  const { ref: emailRef, ...emailReg } = register("email", {
    required: "Email Required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Enter a valid e-mail address",
    },
  });

  return (
    <>
      <FormControl variant="outlined">
        <InputLabel htmlFor="fromLine">From</InputLabel>
        <OutlinedInput
          color="primary"
          variant="outlined"
          label="From"
          name="fromLine"
          id="fromLine"
          {...fromLineReg}
          inputRef={fromLineRef}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title={`Visible to ${cart.alias.aliasName}`}>
                <HelpIcon color="primary" aria-label="pricing information" />
              </Tooltip>
            </InputAdornment>
          }
        ></OutlinedInput>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="email">
          Email <span style={{ color: "#b9b9b9" }}>Private</span>
        </InputLabel>
        <OutlinedInput
          {...emailReg}
          inputRef={emailRef}
          color="primary"
          variant="outlined"
          label="Email: Private"
          name="email"
          labelWidth={2}
          id="email"
          endAdornment={
            <InputAdornment position="end">
              <Tooltip
                title={`Your email is private and will not be seen by ${cart.alias.aliasName}. Receipts and messages from ${cart.alias.aliasName} will be relayed to this email.`}
              >
                <HelpIcon color="primary" aria-label="pricing information" />
              </Tooltip>
            </InputAdornment>
          }
        ></OutlinedInput>
      </FormControl>
    </>
  );
};

export default function AliasCart({ cart, exchangeRates }) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();
  const [message, setMessage] = useState("");
  const smallScreen = useSmallScreen();
  const checkoutCart = (data) => {
    // create stripe session and get session id
    // redirect to session in the callback
    fetchPostJson(
      {
        alias: cart.alias._id,
        order: {
          buyerInfo: {
            email: data.email,
            fromLine: data.fromLine,
          },
          alias: cart.alias._id,
          noteToWisher: data.message,
        },
      },
      process.env.REACT_APP_BASE_URL + "/api/checkout",
      (data) => {
        goToCheckout(data.checkoutSessionId);
      }
    );
  };
  const goToCheckout = (sessionId) => {
    /* Handle any errors returns from Checkout  */
    var handleResult = function (result) {
      if (result.error) {
        alert(result.error.message);
      }
    };

    var stripe = window.Stripe(
      "pk_test_51HAi5vLLBOhef2QNgeOEgpmhxfegnaTxArp0ri2QR4e7c4HxayuuHv8jWN9AzTuLKKEIztnhXgvss5P70Gs4A7kI00052oBzNQ"
    );

    stripe
      .redirectToCheckout({
        sessionId: sessionId,
      })
      .then(handleResult);
  };
  let messageLength;
  if (exchangeRates) {
    const totalPriceUSD =
      (Math.round(cart.totalPrice.float) * exchangeRates[cart.alias.currency]) /
      exchangeRates["USD"];
    messageLength = Math.round(30 + totalPriceUSD);
  }
  const { ref: messageRef, ...messageReg } = register("message ", {
    maxLength: {
      value: messageLength,
      message: `message must be less than ${messageLength + 1} characters`,
    },
  });

  return (
    <TableContainer
      component={Paper}
      style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}
    >
      <form onSubmit={handleSubmit(checkoutCart)}>
        <Table id={`aliasCart-${cart.alias._id}`}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4}>
                Wish Basket for
                <Typography component="span">{` ${cart.alias.aliasName} `}</Typography>
                <Link href={cart.alias.handle}>{`@${cart.alias.handle}`}</Link>
              </TableCell>
            </TableRow>
            {!smallScreen && (
              <TableRow>
                <TableCell>Wish</TableCell>
                <TableCell></TableCell>
                <TableCell>QTY</TableCell>
                <TableCell style={!smallScreen ? { minWidth: "133px" } : null}>
                  Subtotal
                </TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {Object.values(cart.items).map((gift) => (
              <Gift
                screen={smallScreen && "xs"}
                gift={gift}
                exchangeRates={exchangeRates}
              />
            ))}
            <TableRow>
              {!smallScreen && (
                <>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </>
              )}
              <TableCell align="right">Subtotal:</TableCell>
              <TableCell style={{ minWidth: "133px" }} align="right">
                <DisplayPrice priceObject={cart.totalPrice} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>
                <div style={{ display: "grid", gap: "1em" }}>
                  <Typography align="left">Add Message</Typography>
                  <TextField
                    style={{ width: "100%", marginTop: "8px" }}
                    id="outlined-multiline-static"
                    label="Message"
                    name="message"
                    error={messageLength - message.length < 0}
                    value={message}
                    {...messageReg}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    inputRef={messageRef}
                    multiline
                    rows={10}
                    variant="filled"
                    helperText={`This size gift allows you ${messageLength} characters. ${
                      messageLength - message.length
                    } remaining.`}
                  ></TextField>
                  {smallScreen ? (
                    <TenderInfoInputs register={register} cart={cart} />
                  ) : (
                    <Box display="flex" style={{ gap: "1em" }}>
                      <TenderInfoInputs register={register} cart={cart} />
                    </Box>
                  )}
                  <div>
                    <Button
                      type="submit"
                      color="primary"
                      disableElevation
                      variant="contained"
                      style={{ marginTop: "8px", float: "right" }}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </TableContainer>
  );
}
