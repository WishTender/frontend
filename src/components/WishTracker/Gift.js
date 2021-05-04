import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom"; // a comment (can be deleted)
import Button from "@material-ui/core/Button";

const Gift = ({ orderId, gift }) => {
  return (
    <TableRow key={orderId + "-" + gift.item._id}>
      <TableCell>
        <img
          width="60"
          height="60"
          src={gift.item.itemImage}
          alt={gift.item.itemName}
        />
        <p>{gift.item.itemName}</p>
      </TableCell>
      <TableCell>
        <Button
          size="small"
          color="primary"
          // variant="contained"
          component={Link}
          disableElevation
          to={gift.item.url}
        >
          Purchase
        </Button>
      </TableCell>
      <TableCell>{gift.qty} </TableCell>
      <TableCell>{gift.price}</TableCell>
    </TableRow>
  );
};

export default Gift;
