import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import RemoveWish from "./RemoveWish";

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
          disableElevation
          href={gift.item.url}
        >
          Purchase
        </Button>

        <RemoveWish wish={gift.item._id}>
          <Button size="small" disableElevation style={{ display: "block" }}>
            Remove Wish
          </Button>
        </RemoveWish>
      </TableCell>
      <TableCell>{gift.qty} </TableCell>
      <TableCell>{gift.price.original}</TableCell>
    </TableRow>
  );
};

export default Gift;
