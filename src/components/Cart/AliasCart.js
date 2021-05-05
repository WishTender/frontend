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
  FormHelperText,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import React from "react";
import useSmallScreen from "../../hooks/useSmallScreen";
import theme from "../../theme";
import Gift from "./Gift";

const TenderInfoInputs = ({ cart }) => {
  return (
    <>
      <FormControl variant="outlined">
        <InputLabel htmlFor="from">From</InputLabel>
        <OutlinedInput
          color="primary"
          variant="outlined"
          label="From"
          name="from"
          // labelWidth={38}
          id="from"
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

export default function AliasCart({ cart }) {
  const smallScreen = useSmallScreen();
  return (
    <TableContainer
      component={Paper}
      style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}
    >
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
              <TableCell>Subtotal</TableCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody>
          {Object.values(cart.items).map((gift) => (
            <Gift screen={smallScreen && "xs"} gift={gift} />
          ))}
          <TableRow>
            {!smallScreen && (
              <>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </>
            )}
            <TableCell align="right">Subtotal:</TableCell>
            <TableCell align="right">${cart.totalPrice}</TableCell>
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
                  // inputRef={register()}
                  multiline
                  rows={10}
                  variant="filled"
                  helperText="This size gift allows you 666 characters. 666 remaining."
                ></TextField>
                {smallScreen ? (
                  <TenderInfoInputs cart={cart} />
                ) : (
                  <Box display="flex" style={{ gap: "1em" }}>
                    <TenderInfoInputs cart={cart} />
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
    </TableContainer>
  );
}
