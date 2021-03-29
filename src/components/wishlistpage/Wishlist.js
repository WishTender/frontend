import React, { useState, useEffect, useContext } from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import WishItem from "./WishItem";
import { Button } from "@material-ui/core";
import AddWish from "./addwish/AddWish";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import EditWishForm from "./EditWishForm/EditWishForm";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import ExchangeRateApiInterface from "../../scripts/ExchangeRatesApiInterface";
import useTraceUpdate from "../../scripts/useTraceUpdate";
import AddToCart from "./AddToCart/AddToCart";
const ratesApi = new ExchangeRateApiInterface();

function Wishlist(props) {
  const [selectWish, setSelectWish] = useState(null);
  const [convertRate, setConvertRate] = useState(null);
  const [addWishVisible, setAddWishVisible] = useState(false);
  const clientCurrency = useContext(CurrencyContext);
  useTraceUpdate(Wishlist.name, props, {
    selectWish,
    convertRate,
    addWishVisible,
    clientCurrency,
  });

  useEffect(() => {
    if (clientCurrency !== props.currency && props.currency) {
      ratesApi
        .getExchangeRateSync(props.currency, clientCurrency)
        .then(setConvertRate);
    }
  }, [clientCurrency, props.currency]);

  const innerGrid =
    props.items &&
    props.items.map((item) => {
      return (
        <Grid
          key={item._id}
          item
          xs={6}
          sm={4}
          md={3}
          lg={2}
          xl={1}
          container
          spacing={2}
        >
          <div onClick={() => setSelectWish(item)}>
            <WishItem
              itemName={item.itemName}
              price={item.price}
              imageUrl={item.itemImage}
              currency={item.currency}
              convertRate={convertRate}
            />
          </div>
        </Grid>
      );
    });

  return (
    <div className="wishlist">
      {selectWish && (
        <StyledDialog
          onClose={() => {
            setSelectWish(null);
          }}
          open={selectWish ? true : false}
        >
          {props.isAuth ? (
            <EditWishForm
              info={{
                price: selectWish.price,
                itemName: selectWish.itemName,
                itemImage: selectWish.itemImage,
                currency: selectWish.currency,
              }}
              id={selectWish._id}
              onClose={(options) => {
                setSelectWish(null);
                if (options.refresh) props.refreshWishlist();
              }}
            />
          ) : (
            <AddToCart onClose={() => setSelectWish(null)} item={selectWish} />
          )}
        </StyledDialog>
      )}
      {props.isAuth && (
        <div className="wrapper add_a_wish">
          <StyledDialog
            open={addWishVisible}
            onClose={() => setAddWishVisible(false)}
          >
            {/* don't show unless authorized */}
            <AddWish
              wishlist={props.id}
              currency={props.currency}
              afterAddWish={(wish) => {
                setAddWishVisible(false);
                props.refreshWishlist();
              }}
            />
          </StyledDialog>
          <Button
            onClick={() => {
              setAddWishVisible(true);
            }}
            className="button add_a_wish"
            color="primary"
          >
            Add A Wish
          </Button>
        </div>
      )}

      <Grid container spacing={2}>
        {innerGrid}
      </Grid>
    </div>
  );
}

export default Wishlist;
