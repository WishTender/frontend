import React from "react";
import { fetchDelete } from "../../scripts/fetchHelper";
import { Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function RemoveWish(props) {
  const deleteWish = async () => {
    await fetchDelete(
      `${process.env.REACT_APP_BASE_URL}/api/wishes/${props.wish}`,
      (res) => {
        if (res.status <= 200 && res.status > 300) {
          props.setRefreshOrders(true);
        }
      }
    );
  };
  const clone = React.cloneElement(props.children, { onclock: deleteWish });

  return (
    <Tooltip title="Remove wishlist item from your wishlist.">{clone}</Tooltip>
  );
}
