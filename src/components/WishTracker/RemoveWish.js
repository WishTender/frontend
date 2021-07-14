import React, { useContext } from "react";
import { fetchDelete } from "../../scripts/fetchHelper";
import { Tooltip } from "@material-ui/core";
import { WishlistContext } from "../../contexts/WishlistContext";
import { UserContext } from "../../contexts/UserContext";

export default function RemoveWish(props) {
  const { user } = useContext(UserContext);
  const { getWishlist, setWishlist, wishlist } = useContext(WishlistContext);
  const deleteWish = async () => {
    await fetchDelete(
      `${process.env.REACT_APP_BASE_URL}/api/wishlistItems/${props.wish}`,
      async (res) => {
        if (res.status <= 200 && res.status > 300) {
          setWishlist(await getWishlist(user.aliases[0]));
        }
      }
    );
  };
  const clone = React.cloneElement(props.children, { onClick: deleteWish });

  return (
    <>
      {wishlist.wishlistItems.find((item) => item._id === props.wish) && (
        <Tooltip title="Remove wishlist item from your wishlist.">
          {clone}
        </Tooltip>
      )}
    </>
  );
}
