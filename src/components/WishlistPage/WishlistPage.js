import React, { useState, useEffect, useContext } from "react";
import ProfileSection from "./ProfileSection/ProfileSection";
import { UserContext } from "../../contexts/UserContext";
import { WishlistContext } from "../../contexts/WishlistContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import { RouteContext } from "../../contexts/RouteContext";
import { fetchGet } from "../../scripts/fetchHelper";
import { useParams } from "react-router-dom";
import useChooseCurrency from "../../hooks/useChooseCurrency";
import useTraceUpdate from "../../scripts/useTraceUpdate";
import Wishlist from "./Wishlist";
import {
  unitToStandard,
  parsePrice,
  // clientCurrency,
  parseWishlistPrices,
  parseConvertWishlistPrices,
} from "../../scripts/helpers";
import { Typography } from "@material-ui/core";

const handleRoute =
  process.env.REACT_APP_BASE_URL + "/api/aliases?handle_lowercased=";
function WishlistPage(props) {
  const [alias, setAlias] = useState(null);
  const [convertRate, setConvertRate] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [refreshWishlist, setRefreshWishlist] = useState(null);
  const { user: currentUser } = useContext(UserContext);
  const localeContext = useContext(LocaleContext);
  const { getWishlistAndParse, getWishlist } = useContext(WishlistContext);
  const [customGetWishlistAndParse, setCustomGetWishlistAndParse] =
    useState(null);
  useChooseCurrency();
  const {
    currency: clientCurrency,
    setCurrency,
    setCurrencyNeeded,
  } = useContext(CurrencyContext);

  const { setIsCurrentUsersProfile, isCurrentUsersProfile } =
    useContext(RouteContext);
  let { alias: aliasPath } = useParams();

  const states = {
    alias,
    wishlist,
    refreshWishlist,
    currentUser,
  };
  useTraceUpdate(WishlistPage.name, props, states);

  useEffect(() => {
    if (alias && alias.currency) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/api/exchange?base=${alias.currency}&symbols=${clientCurrency}`
      )
        .then(async (response) => {
          let res = await response.json();
          setConvertRate(res.rate);
        })
        .catch((r) => {
          console.log(r);
        });
    }
  }, [alias, clientCurrency]);

  useEffect(() => {
    // if (!clientCurrency) {
    //   setCurrencyNeeded(true);
    // }

    fetchGet(`${handleRoute}${aliasPath.toLowerCase()}`, async (alias) => {
      const wl = alias.wishlists[0];
      setIsCurrentUsersProfile(
        currentUser?.aliases.includes(alias?._id) || false
      );
      if (isCurrentUsersProfile) setCurrency(alias.currency);
      if (wl) {
        if (clientCurrency) {
          if (
            // if we don't need conversion rates
            (currentUser && currentUser.currency === alias.currency) ||
            clientCurrency === "noConversion" ||
            clientCurrency === alias.currency
          ) {
            parseWishlistPrices(wl, alias.currency, localeContext);
            setCustomGetWishlistAndParse({
              function: async () =>
                await getWishlistAndParse(
                  wl._id,
                  alias.currency,
                  localeContext
                ),
            });
          } else {
            // if we DO need conversion rate and there isn't one, get it
            if (!convertRate) {
              const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/exchange?base=${alias.currency}&symbols=${clientCurrency}`
              ).catch((r) => {
                console.log(r);
              });

              let res = await response.json();
              setConvertRate(res.rate);
            }
            parseConvertWishlistPrices(
              wl,
              clientCurrency,
              localeContext,
              convertRate
            );
          }
        }
        setWishlist(wl);
      }

      setAlias(alias);
    });
  }, [
    aliasPath,
    clientCurrency,
    convertRate,
    currentUser,
    localeContext,
    setCurrencyNeeded,
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
    currentUser?.admin ||
    (alias &&
      currentUser?.aliases.includes(alias._id) &&
      currentUser !== undefined);
  return (
    <WishlistContext.Provider
      value={{
        setWishlist,
        wishlist,
        getWishlistAndParseWithArgs: customGetWishlistAndParse?.function,
        getWishlistAndParse,
        getWishlist,
      }}
    >
      <div
        style={{
          // height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {alias && currentUser !== undefined && (
          <ProfileSection
            isAuth={currentUser?.aliases.includes(alias?._id) || false}
            info={alias}
          />
        )}
        {alias &&
          !alias.activated &&
          !currentUser?.aliases.includes(alias?._id) &&
          !currentUser?.admin &&
          "This user hasn't activated their wishlist."}
        {alias &&
          !alias.activated &&
          !currentUser?.aliases.includes(alias?._id) &&
          currentUser?.admin &&
          "This user hasn't activated their wishlist. You can see the wishlist because you are an admin."}
        {
          showWishlist && wishlist && alias && (
            <Wishlist
              handle={aliasPath.toLowerCase()}
              isAuth={currentUser?.aliases.includes(alias._id) || false}
              id={
                wishlist?._id || (alias?.wishlists[0] && alias.wishlists[0]._id)
              }
              currency={alias?.currency}
              items={
                wishlist?.wishlistItems ||
                (alias?.wishlists[0] && alias.wishlists[0].wishlistItems)
              }
              refreshWishlist={async () => {
                setWishlist(
                  await getWishlistAndParse(
                    alias.wishlists[0]._id,
                    alias.currency,
                    localeContext
                  )
                );
              }}
            />
          )
          // ))
        }
      </div>
    </WishlistContext.Provider>
  );
}

export default WishlistPage;
