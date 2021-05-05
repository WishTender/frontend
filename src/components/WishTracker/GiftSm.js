import React, { useContext } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import RemoveWish from "./RemoveWish";

const useStyles = makeStyles((theme) => {
  return {
    itemName: {
      fontSize: ".5rem",
      marginLeft: theme.spacing(1),
      minWidth: "80px",
      width: "100%",
    },
    cell1: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(0),
      "& .MuiBox-root": { maxWidth: "250px" },
    },
    cell2: { paddingLeft: theme.spacing(2), paddingRight: theme.spacing(1) },
    giftButton: {
      display: "block",
      paddingLeft: theme.spacing(0),
    },
  };
});

const Gift = ({ orderId, gift, setRefreshWishlist }) => {
  const classes = useStyles();
  return (
    <TableRow key={orderId + "-" + gift.item._id}>
      <TableCell style={{ minWidth: "40px" }} className={classes.cell1}>
        <Box display="flex" justifyContent="space-between">
          <img
            width="60"
            height="60"
            src={gift.item.itemImage}
            alt={gift.item.itemName}
          />
          <p className={classes.itemName}>
            <a href={gift.item.url}>{gift.item.itemName}</a>
          </p>
        </Box>
      </TableCell>
      <TableCell className={classes.cell2}>
        QTY: {gift.qty}
        <br></br>
        {gift.price}
        <RemoveWish wish={gift.item._id}>
          <Button
            size="small"
            color="primary"
            className={classes.giftButton}
            disableElevation
          >
            Remove
          </Button>
        </RemoveWish>
      </TableCell>
    </TableRow>
  );
};

export default Gift;
