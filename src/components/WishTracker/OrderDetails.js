import React, { useContext, useState } from "react";

import ReplyToTender from "./ReplyToTender";
import HelpIcon from "@material-ui/icons/Help";
import theme from "../../theme";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import GiftSm from "./GiftSm";
import Gift from "./Gift";

import {
  Box,
  Tooltip,
  Button,
  TableBody,
  TableContainer,
  Collapse,
  Typography,
} from "@material-ui/core";

const DisplayMessages = ({ notesToTender }) => {
  if (notesToTender.length === undefined) {
    return (
      <>
        <div
          style={{
            color: "white",
            background: "#0185a9",
            borderRadius: notesToTender.imageAttachment
              ? "20px 20px 0 0"
              : "20px 20px 0 20px",
            padding: "10px",
            marginTop: "20px",
            fontWeight: "700",
          }}
        >
          {notesToTender.message}
        </div>
        {notesToTender.imageAttachment && (
          <img
            style={{
              width: "100%",
              borderRadius: notesToTender.message
                ? "0 0 0 20px"
                : "20px 20px 0 20px",
            }}
            src={notesToTender.imageAttachment}
            alt="user attached imaged to thank you note"
          ></img>
        )}
      </>
    );
  }
  return (
    <>
      {notesToTender.map((note) => {
        return (
          <>
            {note.message && (
              <div
                style={{
                  color: "white",
                  background: "#0185a9",
                  borderRadius: note.imageAttachment
                    ? "20px 20px 0 0"
                    : "20px 20px 0 20px",
                  padding: "10px",
                  marginTop: "20px",
                  fontWeight: "700",
                }}
              >
                {note.message}
              </div>
            )}
            {note.imageAttachment && (
              <img
                style={{
                  width: "100%",
                  borderRadius: note.message
                    ? "0 0 0 20px"
                    : "20px 20px 0 20px",
                }}
                src={note.imageAttachment}
                alt="user attached imaged to thank you note"
              ></img>
            )}
          </>
        );
      })}
    </>
  );
};

export default function OrderDetails({
  order,
  open,
  classes,
  setRefreshOrders,
  screen,
}) {
  const [reply, setReply] = useState(null);

  let gifts = order.gifts;
  gifts = gifts.map((gift) => {
    return screen === "xs" ? (
      <GiftSm orderId={order._id} gift={gift} />
    ) : (
      <Gift orderId={order._id} gift={gift} />
    );
  });
  return (
    <Collapse
      className={classes.collapse}
      in={open}
      timeout="auto"
      unmountOnExit
    >
      <TableContainer className={classes.table}>
        <Table id={`order-${order._id}`}>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={5}
                align="right"
                style={{
                  paddingTop: theme.spacing(0.5),
                  paddingBottom: theme.spacing(0.5),
                }}
              >
                <Typography variant="caption">Order ID: {order._id}</Typography>
              </TableCell>
            </TableRow>
            {screen !== "xs" && (
              <TableRow>
                <TableCell>Wish</TableCell>
                <TableCell></TableCell>
                <TableCell>QTY</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {gifts}
            <TableRow
              style={
                screen === "xs"
                  ? { background: theme.palette.secondary.xxLight }
                  : null
              }
            >
              {screen !== "xs" ? (
                <>
                  <TableCell rowSpan={1} />
                  <TableCell style={{ minWidth: "140px" }}>
                    Total WishTender
                  </TableCell>
                </>
              ) : (
                <TableCell style={{ textAlign: "right" }}>
                  Total WishTender
                </TableCell>
              )}
              <TableCell
                style={
                  screen === "xs"
                    ? {
                        paddingLeft: theme.spacing(0),
                        paddingRight: theme.spacing(1),
                      }
                    : null
                }
                align={screen !== "xs" ? "right" : "left"}
                colSpan={2}
              >
                {order.tender.afterConversion ? (
                  <>
                    {screen !== "xs" && order.tender.afterConversion.display}
                    <Tooltip
                      title={`You received ${order.tender.afterConversion.display} instead of ${order.tender.amount.display} because there
                        was a currency conversion. Sometimes our predicted
                        exchange rates aren't the same as our payment processor's
                        exchange rates so you may get a different amount. Please
                        text Dash (founder of WishTender) if you would like a
                        better solution 773-425-8000.`}
                    >
                      <div style={{ display: "inline" }}>
                        {screen === "xs" &&
                          order.tender.afterConversion.display}
                        <HelpIcon
                          // fontSize="small"
                          style={{ fontSize: 16 }}
                          color="error"
                          aria-label="pricing information"
                        />
                      </div>
                    </Tooltip>
                  </>
                ) : (
                  order.tender.amount.display
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              {/* <TableCell colSpan={1}></TableCell> */}
              <TableCell colSpan={4}>
                {order.noteToWisher ? (
                  <>
                    <Typography variant="overline" display="block">
                      Tender's Note:
                    </Typography>
                    {order.noteToWisher.message}
                  </>
                ) : (
                  "The tender didn't leave a note"
                )}
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    color="primary"
                    variant="contained"
                    disableElevation
                    // disabled={!!reply}
                    onClick={() => {
                      if (reply?._id === order._id) {
                        setReply(null);
                      } else {
                        setReply(order);
                      }
                    }}
                  >
                    {!reply
                      ? order.noteToTender
                        ? "Reply Again"
                        : "Reply"
                      : "Close"}
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
            {reply && (
              <TableRow>
                <TableCell colSpan={4}>
                  {reply && (
                    <ReplyToTender
                      to={reply.fromLine}
                      setReply={setReply}
                      setRefreshOrders={setRefreshOrders}
                      order={reply}
                    />
                  )}
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={4}>
                <Typography variant="overline" display="block">
                  Your Thank You Notes:
                </Typography>
                <div
                  style={{
                    float: "right",
                    width: "80%",
                    maxWidth: "400px",
                  }}
                >
                  <DisplayMessages
                    notesToTender={order.noteToTender}
                  ></DisplayMessages>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Collapse>
  );
}
