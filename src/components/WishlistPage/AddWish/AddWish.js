import React, { useState, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import Search from "./Search.js";
import filterOutSmallImages from "./filterImages";
import WishForm from "./WishForm/WishForm";
import useScreenSize from "../../../hooks/useScreenSize";
import "./AddWish.css";
import StyledDialog from "../../common/StyledDialog/StyledDialog";
import { Box } from "@material-ui/core";
import ResponsiveDialogTitleSection from "../../common/StyledDialog/TopSections/ResponsiveTopTitleSection/ResponsiveDialogCloseAndTitleSection.js";
// const fetchPostJson = async (data, route, callback) => {
//   const headers = new Headers();
//   headers.append("Content-Type", "application/json");
//   await fetch(route, {
//     credentials: "include",
//     method: "POST",
//     body: JSON.stringify(data),
//     headers,
//   })
//     // .then((res) => res.json())
//     .then((response) => {
//       console.log("server response: ", response);
//       if (callback) callback();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// import { fetchPostJson } from "../../../scripts/fetchHelper";

const useStyles = makeStyles((theme) => {
  return {
    progressError: {
      "& .MuiLinearProgress-bar": { backgroundColor: theme.palette.error.main },
    },
    progressSuccess: {
      "& .MuiLinearProgress-bar": { backgroundColor: "greenyellow" },
    },
  };
});
function StyledProgressBar(props) {
  const classes = useStyles(props);
  const { status } = props;

  return (
    <LinearProgress
      className={
        status === "error"
          ? classes.progressError
          : status === "success"
          ? classes.progressSuccess
          : ""
      }
      color={status === "loading" ? "secondary" : "primary"}
      variant={status === "loading" ? "indeterminate" : "determinate"}
      value={100}
    />
  );
}

function AddWish1(props) {
  const { user } = useContext(UserContext);

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
  const [status, setStatus] = useState(null);
  function filterAndSetImages(uniqueImages) {
    filterOutSmallImages(uniqueImages, 100).then((images) => {
      setFilteredImages(images);
    });
  }

  function handleScrapeProduct(url) {
    // setUrl(url);
    // axios
    //   .get(`${process.env.REACT_APP_BASE_URL}/api/wishes/productInfo`, {
    //     url: url,
    //   })
    //   .then(async (res) => {
    //     // if (res.status !== 200) {
    //     //   const json = await res.json();
    //     //   alert(json.message);
    //     // }
    //     const info = res.data;
    //     const images = info.imageSrcs;
    //     delete info.imageSrcs;
    //     setProductInfo(info);
    //     if (res.data) setRetrieved("true");

    //     const uniqueImages = [...new Set(images)];
    //     filterAndSetImages(uniqueImages);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setUrl(url);
    setStatus("loading");

    fetch(`${process.env.REACT_APP_BASE_URL}/api/wishes/productInfo?url=${url}`)
      .then(async (res) => {
        if (res.status >= 400 && res.status < 500) {
          const json = await res.json();
          alert(json.message);
        } else if (res.status >= 500 && res.status < 600) {
          const msg = await res.text();
          alert(msg);
        } else {
          const info = await res.json();
          const images = info.imageSrcs;
          delete info.imageSrcs;
          setProductInfo(info);
          if (info) {
            setRetrieved("true");
            setStatus("success");
          }

          const uniqueImages = [...new Set(images)];
          filterAndSetImages(uniqueImages);
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });
  }
  const postWish = async (data) => {
    data.url = url;
    data.currency = props.currency;
    data.wishlist = props.wishlist;
    const headers = new Headers();
    headers.append("CSRF-Token", user.csrfToken);
    headers.append("Content-Type", "application/json");
    await fetch(process.env.REACT_APP_BASE_URL + "/api/wishlistItems", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(data),
      headers,
    })
      // .then((res) => res.json())
      .then((response) => {
        console.log("server response: ", response);
        if (response.status >= 200 && response.status < 300) {
          props.afterAddWish(data);
        }
        clearProduct();
      })
      .catch((err) => {
        console.log(err);
      });
    // fetchPostJson(
    //   wishInfo,
    //   process.env.REACT_APP_BASE_URL + "/api/wishlistItems",
    //   () => props.afterAddWish(wishInfo)
    // );
  };
  const clearProduct = () => {
    setStatus(null);

    setRetrieved(false);
    setProductInfo({
      price: "",
      title: "",
      currency: "",
      ogImageSrcs: [],
      imageSrcs: [],
    });
    setFilteredImages([]);
  };
  return (
    <StyledDialog
      onClose={() => {
        clearProduct();
        props.onClose();
      }}
      open={props.open}
    >
      <Box
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: screenSize === "sm" && "400px",
        }}
      >
        {status && <StyledProgressBar status={status} />}
        <ResponsiveDialogTitleSection
          onClose={() => {
            clearProduct();
            props.onClose();
          }}
        >
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
