import React from "react";
import { fetchDelete } from "../../scripts/fetchHelper";
import { Tooltip } from "@material-ui/core";

export default function RemoveWish(props) {
  const deleteWish = async () => {
    await fetchDelete(
      `${process.env.REACT_APP_BASE_URL}/api/wishListItems/${props.wish}`,
      (res) => {
        if (res.status <= 200 && res.status > 300) {
          alert("deleted");
        }
      }
    );
  };
  const clone = React.cloneElement(props.children, { onClick: deleteWish });

  return (
    <Tooltip title="Remove wishlist item from your wishlist.">{clone}</Tooltip>
  );
}
