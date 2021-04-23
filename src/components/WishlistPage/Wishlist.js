import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import WishItem from "./WishItem";
import { Button, Container, Typography } from "@material-ui/core";
import AddWish from "./AddWish/AddWish";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import EditWishForm from "./EditWishForm/EditWishForm";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import useTraceUpdate from "../../scripts/useTraceUpdate";
import AddToCart from "./AddToCart/AddToCart";
import { withStyles } from "@material-ui/core/styles";
import useCustomStyles from "../../themeStyles";

const styles = (theme) => ({
  wishlistWrapper1: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2%",

    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  addWishButton: {
    [theme.breakpoints.down("xl")]: {
      width: "10vw",
    },
    [theme.breakpoints.down("lg")]: {
      width: "15vw",
    },
    [theme.breakpoints.down("md")]: {
      width: "22vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "28vw",
    },
    [theme.breakpoints.down("xs")]: {
      width: "-webkit-fill-available",
      marginLeft: 0,
      marginRight: 0,
    },
  },
});

function Wishlist(props) {
  const customClasses = useCustomStyles(props);
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
      const fetchData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/exchange?base=${props.currency}&symbols=${clientCurrency}`
        );
        let rate = await response.json();
        setConvertRate(rate.rate);
      };

      fetchData();
      // ratesApi
      //   .getExchangeRateSync(props.currency, clientCurrency)
      //   .then(setConvertRate);
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
      <Container className={customClasses.wishlistWrapper1}>
        <Typography> Wishes: {props?.items?.length}</Typography>
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
              className={
                customClasses.gradient +
                " " +
                customClasses.addWishButton +
                " " +
                customClasses.margin
              }
              color="primary"
              variant="contained"
              style={{ fontWeight: 600 }}
            >
              Add A Wish
            </Button>
          </div>
        )}
      </Container>

      <Grid container spacing={2}>
        {innerGrid}
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Wishlist);
