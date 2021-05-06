import React, { useState, useEffect, useContext } from "react";
import ProfileSection from "./ProfileSection/ProfileSection";
import { UserContext } from "../../contexts/UserContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import { RouteContext } from "../../contexts/RouteContext";
import { fetchGet } from "../../scripts/fetchHelper";
import { useParams } from "react-router-dom";
import useTraceUpdate from "../../scripts/useTraceUpdate";
import Wishlist from "./Wishlist";
import {
  unitToStandard,
  parsePrice,
  clientCurrency,
  parseWishlistPrices,
  parseConvertWishlistPrices,
} from "../../scripts/helpers";

const handleRoute =
  process.env.REACT_APP_BASE_URL + "/api/aliases?handle_lowercased=";
function WishlistPage(props) {
  const [alias, setAlias] = useState(null);
  const [convertRate, setConvertRate] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [refreshWishlist, setRefreshWishlist] = useState(null);
  const { user: currentUser } = useContext(UserContext);
  const localeContext = useContext(LocaleContext);
  const clientCurrency = useContext(CurrencyContext);
  const { setIsCurrentUsersProfile } = useContext(RouteContext);
  let { alias: aliasPath } = useParams();

  const states = {
    alias,
    wishlist,
    refreshWishlist,
    currentUser,
  };
  useTraceUpdate(WishlistPage.name, props, states);

  useEffect(() => {
    fetchGet(`${handleRoute}${aliasPath.toLowerCase()}`, async (alias) => {
      const wl = alias.wishlists[0];
      if (wl) {
        if (
          (currentUser && currentUser.currency === alias.currency) ||
          clientCurrency === alias.currency
        ) {
          parseWishlistPrices(wl, alias.currency, localeContext);
        } else {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/exchange?base=${alias.currency}&symbols=${clientCurrency}`
          );

          let rate = await response.json();
          setConvertRate(rate.rate);
          parseConvertWishlistPrices(
            wl,
            clientCurrency,
            localeContext,
            convertRate
          );
        }
      }
      setIsCurrentUsersProfile(
        currentUser?.aliases.includes(alias?._id) || false
      );
      setAlias(alias);
    });
  }, [
    aliasPath,
    clientCurrency,
    convertRate,
    currentUser,
    localeContext,
    setIsCurrentUsersProfile,
  ]);

  useEffect(() => {
    if (refreshWishlist) {
      fetchGet(
        `${process.env.REACT_APP_BASE_URL}/api/wishlists/${alias.wishlists[0]._id}`,
        (wishlist) => {
          parseWishlistPrices(wishlist, alias.currency, localeContext);

          setWishlist(wishlist);
          setRefreshWishlist(false);
        }
      );
    }
  }, [refreshWishlist]); // do we need both of these? why not just set alias.wishlists when the wishlist is updated

  const showWishlist =
    (alias && alias.activated) ||
    (alias &&
      currentUser?.aliases.includes(alias._id) &&
      currentUser !== undefined);
  return (
    <div>
      {alias && currentUser !== undefined && (
        <ProfileSection
          isAuth={currentUser?.aliases.includes(alias?._id) || false}
          info={alias}
        />
      )}
      {
        showWishlist && (
          <Wishlist
            isAuth={currentUser?.aliases.includes(alias._id) || false}
            id={
              wishlist?._id || (alias?.wishlists[0] && alias.wishlists[0]._id)
            }
            currency={alias?.currency}
            items={
              wishlist?.wishlistItems ||
              (alias?.wishlists[0] && alias.wishlists[0].wishlistItems)
            }
            refreshWishlist={() => {
              setRefreshWishlist(true);
            }}
          />
        )
        // ))
      }
      {alias &&
        !alias.activated &&
        "This user hasn't activated their wishlist."}
    </div>
  );
}

export default WishlistPage;
