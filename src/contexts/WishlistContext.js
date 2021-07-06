import { createContext } from "react";
import { fetchGet } from "../scripts/fetchHelper";
import { parseWishlistPrices } from "../scripts/helpers";

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
  getWishlistAndParse: async (wishlistId, currency, locale) => {
    const wishlist = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/wishlists/${wishlistId}`,
      {
        credentials: "include",
      }
    ).then(async (res) => {
      if (res.status >= 200 && res.status < 300) {
        const wishlist = await res.json();
        parseWishlistPrices(wishlist, currency, locale);
        return wishlist;
      } else {
        alert(await res.json);
      }
    });
    return wishlist || null;
  },
});
