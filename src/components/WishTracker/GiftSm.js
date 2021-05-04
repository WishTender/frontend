import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom"; // a comment (can be deleted)
import Button from "@material-ui/core/Button";

import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    itemName: {
      fontSize: ".5rem",
      marginLeft: theme.spacing(1),
      minWidth: "80px",
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

const Gift = ({ orderId, gift }) => {
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
          <p className={classes.itemName}>{gift.item.itemName}</p>
        </Box>
      </TableCell>
      <TableCell className={classes.cell2}>
        QTY: {gift.qty}
        <br></br>
        {gift.price}
        <Button
          size="small"
          color="primary"
          className={classes.giftButton}
          // variant="contained"
          component={Link}
          disableElevation
          to={gift.item.url}
        >
          Purchase
        </Button>
        {/* <Button
          size="small"
          // color="primary"
          className={classes.giftButton}
          // variant="contained"
          component={Link}
          disableElevation
          to={gift.item.url}
        >
          Delete
        </Button> */}
      </TableCell>
      {/* <TableCell>{gift.price}</TableCell> */}
    </TableRow>
  );
};

export default Gift;
