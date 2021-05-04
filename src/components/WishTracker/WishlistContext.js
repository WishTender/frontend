import { createContext } from "react";
import { fetchGet } from "../../scripts/fetchHelper";

export const WishlistContext = createContext({
  wishlist: null,
  setWishlist: () => {},
  getWishlist: async (wishlistId) => {
    let wishlist;
    await fetchGet(
      `${process.env.REACT_APP_BASE_URL}/api/wishlists/${wishlistId}`,
      (res) => {
        wishlist = res;
      }
    );
    return wishlist || null;
  },
});
