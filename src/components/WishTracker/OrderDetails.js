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
                    Total Wishtender
                  </TableCell>
                </>
              ) : (
                <TableCell style={{ textAlign: "right" }}>
                  Total Wishtender
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
                  {!order.noteToTender && (
                    <Button
                      color="primary"
                      variant="contained"
                      disableElevation
                      disabled={!!reply}
                      onClick={() => setReply(order)}
                    >
                      Reply
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
            {(order.noteToTender || reply) && (
              <TableRow>
                <TableCell colSpan={4}>
                  {order.noteToTender ? (
                    <>
                      <Typography variant="overline" display="block">
                        Your Thank You Note:
                      </Typography>

                      {order.noteToTender.message}
                    </>
                  ) : (
                    reply && (
                      <ReplyToTender
                        to={reply.fromLine}
                        setReply={setReply}
                        setRefreshOrders={setRefreshOrders}
                        order={reply}
                      />
                    )
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Collapse>
  );
}
