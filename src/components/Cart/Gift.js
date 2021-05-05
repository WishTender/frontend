import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/AddBox";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import theme from "../../theme";

const useStyles = makeStyles((theme) => {
  return {
    itemName_xs: {
      fontSize: ".5rem",
      marginLeft: theme.spacing(1),
      minWidth: "80px",
      width: "100%",
    },
    cell1_xs: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(0),
      "& .MuiBox-root": { maxWidth: "250px" },
    },
    cell2_xs: { paddingLeft: theme.spacing(2), paddingRight: theme.spacing(1) },
    giftButton_xs: {
      display: "block",
      paddingLeft: theme.spacing(0),
    },
  };
});

const GiftImageAndName = ({ gift, classes, screen }) => {
  return (
    <>
      <img
        width="60"
        height="60"
        src={gift.item.itemImage}
        alt={gift.item.itemName}
      />
      <p className={screen === "xs" ? classes.itemName_xs : null}>
        {gift.item.itemName}
      </p>
    </>
  );
};

const Quantity = ({ gift, screen }) => {
  return (
    <Box display="flex" alignItems="center">
      {screen === "xs" && "QTY: "}
      <span style={{ paddingRight: theme.spacing(1) }}>{gift.qty}</span>
      <AddIcon color="primary" />
      <RemoveIcon color="primary" />
    </Box>
  );
};

export default function Gift({ gift, screen }) {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell
        style={screen === "xs" ? { minWidth: "40px" } : null}
        className={screen === "xs" ? classes.cell1_xs : null}
      >
        {screen === "xs" ? (
          <Box display="flex" justifyContent="space-between">
            <GiftImageAndName gift={gift} screen={screen} classes={classes} />
          </Box>
        ) : (
          <GiftImageAndName gift={gift} screen={screen} classes={classes} />
        )}
      </TableCell>
      {screen === "xs" ? (
        <TableCell className={classes.cell2_xs}>
          <Quantity gift={gift} screen="xs" />
          <br></br>
          {gift.price}
          {/* <RemoveWish wish={gift._id}> */}
          <Button
            size="small"
            color="primary"
            className={classes.giftButton_xs}
            disableElevation
          >
            Remove
          </Button>
          {/* </RemoveWish> */}
        </TableCell>
      ) : (
        <>
          <TableCell>
            {/* <RemoveWish wish={gift._id}> */}
            <Button
              size="small"
              color="primary"
              className={classes.giftButton_xs}
              disableElevation
            >
              Remove
            </Button>
            {/* </RemoveWish> */}
          </TableCell>
          <TableCell>
            <Quantity gift={gift} />
          </TableCell>

          <TableCell>
            {/* <Typography style={{ fontSize: "0.6rem" }}>Subtotal: </Typography> */}
            ${gift.price}
          </TableCell>
        </>
      )}
    </TableRow>
  );
}
