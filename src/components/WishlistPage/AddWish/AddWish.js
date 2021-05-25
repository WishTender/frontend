import React, { useState } from "react";
import axios from "axios";
import Search from "./Search.js";
import filterOutSmallImages from "./filterImages";
import WishForm from "./WishForm/WishForm";
import useScreenSize from "../../../hooks/useScreenSize";
import "./AddWish.css";
import { makeStyles } from "@material-ui/core/styles";
import StyledDialog from "../../common/StyledDialog/StyledDialog";
import { Box } from "@material-ui/core";
import ResponsiveDialogTitleSection from "../../common/StyledDialog/TopSections/ResponsiveTopTitleSection/ResponsiveDialogCloseAndTitleSection.js";
const fetchPostJson = async (data, route, callback) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  await fetch(route, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(data),
    headers,
  })
    // .then((res) => res.json())
    .then((response) => {
      console.log("server response: ", response);
      if (callback) callback();
    })
    .catch((err) => {
      console.log(err);
    });
};
// import { fetchPostJson } from "../../../scripts/fetchHelper";

function AddWish1(props) {
  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });
  const [productInfo, setProductInfo] = useState({
    price: "",
    title: "",
    currency: "",
    ogImageSrcs: [],
    imageSrcs: [],
  });
  const useStyles = makeStyles((theme) => {
    return {
      container: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",

        paddingBottom: screenSize === "sm" && theme.spacing(3),
      },
      input_container: { padding: theme.spacing(4, 4, 1, 4) },
    };
  });
  const classes = useStyles();
  const [filteredImages, setFilteredImages] = useState([]);
  const [url, setUrl] = useState(null);
  const [retrieved, setRetrieved] = useState(null);
  function filterAndSetImages(uniqueImages) {
    filterOutSmallImages(uniqueImages, 100).then((images) => {
      setFilteredImages(images);
    });
  }

  function handleScrapeProduct(url) {
    setUrl(url);
    axios
      .post("http://localhost:4000/api/wishes/productInfo", { url: url })
      .then((res) => {
        const info = res.data;
        const images = info.imageSrcs;
        delete info.imageSrcs;
        setProductInfo(info);
        if (res.data) setRetrieved("true");

        const uniqueImages = [...new Set(images)];
        filterAndSetImages(uniqueImages);
      });
  }
  const postWish = (data) => {
    const wishInfo = data;
    wishInfo.url = url;
    wishInfo.currency = props.currency;
    wishInfo.wishlist = props.wishlist;
    fetchPostJson(
      wishInfo,
      process.env.REACT_APP_BASE_URL + "/api/wishlistItems",
      () => props.afterAddWish(wishInfo)
    );
  };

  return (
    <StyledDialog onClose={props.onClose} open={props.open}>
      <Box
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: screenSize === "sm" && "400px",
        }}
      >
        <ResponsiveDialogTitleSection onClose={props.onClose}>
          Add A Wish
        </ResponsiveDialogTitleSection>

        <Box className={classes.container}>
          <Box className={classes.input_container}>
            <Search submit={(e) => handleScrapeProduct(e)} />
          </Box>
          <WishForm
            classes={classes}
            disabled={!retrieved}
            info={productInfo}
            images={filteredImages}
            onSubmit={postWish}
          />
        </Box>
      </Box>
    </StyledDialog>
  );
}

export default AddWish1;
