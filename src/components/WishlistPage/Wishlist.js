import React, { forwardRef, useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import WishItem from "./WishItem";
import { Route, withRouter } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";

import { Button, Container, Typography } from "@material-ui/core";
import AddWish from "./AddWish/AddWish";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import EditWishForm from "./EditWishForm/EditWishForm";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import useTraceUpdate from "../../scripts/useTraceUpdate";
import AddToCart from "./AddToCart/AddToCart";
import { withStyles } from "@material-ui/core/styles";
import useCustomStyles from "../../themeStyles";
import { WishlistContext } from "../../contexts/WishlistContext";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import useScreenSize from "../../hooks/useScreenSize";

// import arrayMove from "array-move";
// import "./styles.css";
// import { css } from "@emotion/react";
import {
  closestCenter,
  DndContext,
  // KeyboardSensor,
  // PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  SortableContext,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ArcherContainer, ArcherElement } from "react-archer";
import theme from "../../theme";

const styles = (theme) => ({
  animatedBounce: {
    animationName: "$bounce",
    animationTimingFunction: "cubic-bezier(0.280, 0.840, 0.420, 1)",
    animationDuration: "2s",
    animationIterationCount: "2",
  },
  "@keyframes bounce": {
    "0%": { transform: "scale(1,1)      translateY(0)" },
    "12%": { transform: "scale(1,1)      translateY(-5px)" },
    "30%": { transform: "scale(1,1)      translateY(0)" },
    "45%": { transform: "scale(1,1)      translateY(-5px)" },
    "60%": { transform: "scale(1,1)      translateY(0)" },
    "70%": { transform: "scale(1,1)      translateY(-5px)" },
    "80%": { transform: "scale(1,1)      translateY(0)" },
    "100%": { transform: "scale(1,1)      translateY(0) " },
  },

  animatedBreath: {
    animation: "$breath 2.7s ease-out 5 normal",
    "-webkit-font-smoothing": "antialiased",
  },

  "@keyframes breath": {
    "0%": {
      "-webkit-transform": "scale(1)",
      "-ms-transform": "scale(1)",
      transform: "scale(1)",
    },
    "50%": {
      "-webkit-transform": "scale(0.9)",
      "-ms-transform": "scale(0.9)",
      transform: "scale(0.9)",
    },
    "80%": {
      "-webkit-transform": "scale(1)",
      "-ms-transform": "scale(1)",
      transform: "scale(1)",
    },
    "100%": {
      "-webkit-transform": "scale(1)",
      "-ms-transform": "scale(1)",
      transform: "scale(1)",
    },
  },
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

const Wishlist = withRouter((props) => {
  function isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }
  const [activeId, setActiveId] = useState(null);
  const touch = isTouchDevice();

  const params = new URLSearchParams(window.location.search);
  const customClasses = useCustomStyles(props);
  // const [updateOrder, setUpdateOrder] = useState(false);
  const [selectWish, setSelectWish] = useState(
    props.items.find((i) => i._id === params.get("item")) || null
  );
  const [addWishVisible, setAddWishVisible] = useState(false);
  const [textStoppedBouncing, setTextStoppedBouncing] = useState(false);
  const { currency: clientCurrency } = useContext(CurrencyContext);
  const { setWishlist, wishlist, getWishlistAndParseWithArgs } =
    useContext(WishlistContext);

  const [items, setItems] = useState(
    wishlist.wishlistItems.map((item, i) => {
      item.id = i + 1;
      return item;
    })
  );

  useTraceUpdate(Wishlist.name, props, {
    selectWish,
    addWishVisible,
    clientCurrency,
  });

  // useEffect(() => {
  //   if (updateOrder) {
  //     const headers = new Headers();
  //     headers.append("Content-Type", "application/json");
  //     (async () => {
  //       await fetch(
  //         `${process.env.REACT_APP_BASE_URL}/api/wishlists/${wishlist._id}`,
  //         {
  //           credentials: "include",
  //           method: "PATCH",
  //           body: JSON.stringify({ wishlistItems: items.map((i) => i._id) }),
  //           headers,
  //         }
  //       )
  //         .then(async (res) => {
  //           setWishlist(await getWishlistAndParseWithArgs());
  //         })
  //         .catch((err) => alert(err));
  //     })();
  //   }
  //   setUpdateOrder(false);
  // }, [getWishlistAndParseWithArgs, items, setWishlist, wishlist._id]);
  useEffect(() => {
    setItems(
      wishlist.wishlistItems.map((item, i) => {
        item.id = i + 1;
        return item;
      })
    );
  }, [wishlist]);

  useEffect(() => {
    props.history.push(
      `/dashiell${selectWish?._id ? `?item=${selectWish._id}` : ""}`
    );
    console.log(0);
  }, [selectWish]);

  useEffect(() => {
    if (props.isAuth && !props?.items.length) {
      const handleAnimationEnd = () => {
        setTextStoppedBouncing(true);
      };
      const text = document.querySelector(`#instructions`);

      text.addEventListener("animationend", handleAnimationEnd);
      return () => text.removeEventListener("animationend", handleAnimationEnd);
    }
  }, [props.isAuth, props?.items.length]);
  const MyItem = forwardRef(({ item, id, isAuth, ...props }, ref) => {
    return (
      <Grid
        {...props}
        ref={ref}
        key={item._id}
        id={`item-card-${item._id}`}
        item
        xs={6}
        sm={4}
        md={3}
        lg={2}
        xl={1}
        container
        spacing={2}
      >
        <div style={{ width: "100%" }} onClick={() => setSelectWish(item)}>
          <WishItem
            itemName={item.itemName}
            isAuth={isAuth}
            id={item._id}
            price={item.price}
            imageUrl={item.itemImage}
            currency={item.currency}
          />
        </div>
      </Grid>
    );
  });
  const innerGrid =
    props.items &&
    props.items.map((item, i) => {
      return (
        <Grid
          key={item._id}
          id={`item-card-${item._id}`}
          item
          xs={6}
          sm={4}
          md={3}
          lg={2}
          xl={1}
          container
          spacing={2}
        >
          <div
            style={{ width: "100%" }}
            onClick={() => {
              console.log("wishitem");

              setSelectWish(item);
            }}
          >
            <WishItem
              itemName={item.itemName}
              isAuth={true}
              price={item.price}
              id={item._id}
              imageUrl={item.itemImage}
              currency={item.currency}
            />
          </div>
        </Grid>
      );
    });
  const MySortableItem = ({ id, item }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      // transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      // height: "100px",
      // background: "grey",
      transform: CSS.Transform.toString(transform),
      // transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <MyItem
        isAuth={props.isAuth}
        item={item}
        ref={setNodeRef}
        style={style}
        // {...attributes}
        {...listeners}
        id={id}
      />
    );
  };

  return (
    <div className="wishlist" style={{ paddingBottom: "6em" }}>
      {selectWish && props.isAuth && (
        <StyledDialog
          onClose={() => {
            setSelectWish(null);
          }}
          open={selectWish ? true : false}
        >
          <EditWishForm
            info={{
              price: selectWish.price.float,
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
        </StyledDialog>
      )}
      {/* {selectWish && !props.isAuth && (
        <AddToCart open={selectWish} onClose={() => setSelectWish(null)} item={selectWish} />
      )} */}
      {selectWish && !props.isAuth && (
        <AddToCart
          open={selectWish ? true : false}
          onClose={() => {
            setSelectWish(null);
          }}
          item={selectWish}
        />
      )}
      <ArcherContainer style={{ display: "grid" }}>
        {/* //test */}

        <Container className={customClasses.wishlistWrapper1}>
          <Typography> Wishes: {props?.items?.length}</Typography>
          {props.isAuth && (
            <div className="wrapper add_a_wish">
              <AddWish
                open={addWishVisible}
                onClose={() => {
                  setAddWishVisible(false);
                }}
                wishlist={props.id}
                currency={props.currency}
                afterAddWish={(wish) => {
                  setAddWishVisible(false);
                  props.refreshWishlist();
                }}
              />
              <ArcherElement id="addwish">
                <Button
                  onClick={() => {
                    setAddWishVisible(true);
                  }}
                  className={`${customClasses.gradient} ${
                    customClasses.addWishButton
                  } ${customClasses.margin} 
                      ${
                        props.isAuth &&
                        !props?.items.length &&
                        textStoppedBouncing
                          ? customClasses.animatedBreath
                          : ""
                      }`}
                  color="primary"
                  disableElevation
                  variant="contained"
                  style={{ fontWeight: 600 }}
                >
                  Add A Wish
                </Button>
              </ArcherElement>
            </div>
          )}
        </Container>
        {props.isAuth && !props?.items.length && (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              marginTop: "6vh",
              alignItems: "center",
            }}
          >
            <ArcherElement
              svgContainerStyle={{
                padding: "20px",
                border: "1px solid red",
              }}
              id="root"
              relations={[
                {
                  targetId: "addwish",
                  targetAnchor: "bottom",
                  sourceAnchor: "top",
                  style: {
                    lineStyle: "curve",
                    strokeWidth: "4",
                    strokeColor: theme.palette.primary.dark,
                  },
                },
              ]}
            >
              <div
                id="instructions"
                className={customClasses.animatedBounce}
                style={{
                  width: "fit-content",
                  position: "relative",
                  marginLeft: "20vw",
                  fontSize: "clamp(.6em, 3vw, 1em)",
                  display: "flex",
                  flexDirection: "column",
                  color: "grey",
                }}
              >
                Find a URL of a product you want, then
                <span
                  style={{
                    fontSize: "clamp(1.6em, 4vw, 4em)",
                    color: "black",
                  }}
                >
                  Add a wish
                </span>
              </div>
            </ArcherElement>
          </div>
        )}
      </ArcherContainer>

      {!touch ? (
        <DndContext
          // sensors={sensors}
          // collisionDetection={closestCenter}
          // onDragStart={(event) => {
          //   setActiveId(event.active.id);
          // }}
          onDragEnd={async ({ active, over }) => {
            if (!over) return null;
            if (active.id === over.id) return null;
            const oldIndex = items.map((item) => item.id).indexOf(active.id);
            const newIndex = items.map((item) => item.id).indexOf(over.id);
            const newItems = arrayMove(items, oldIndex, newIndex);
            setItems(newItems);
            // items state wasn't always updating in time
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            await fetch(
              `${process.env.REACT_APP_BASE_URL}/api/wishlists/${wishlist._id}`,
              {
                credentials: "include",
                method: "PATCH",
                body: JSON.stringify({
                  wishlistItems: newItems.map((i) => i._id),
                }),
                headers,
              }
            )
              .then(async (res) => {
                setWishlist(await getWishlistAndParseWithArgs());
              })
              .catch((err) => alert(err));
            setActiveId(null);
          }}
        >
          <Grid container spacing={2}>
            <SortableContext items={items} strategy={rectSortingStrategy}>
              {items.map((item, index) => {
                return (
                  <MySortableItem
                    id={item.id}
                    isAuth={props.isAuth}
                    key={index}
                    item={item}
                    isDragging={activeId === item}
                  />
                );
              })}
            </SortableContext>
          </Grid>
          <DragOverlay>
            {activeId ? <MyItem id={activeId} /> : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <Grid container spacing={2}>
          {innerGrid}
        </Grid>
      )}
    </div>
  );
});

export default withStyles(styles)(Wishlist);
