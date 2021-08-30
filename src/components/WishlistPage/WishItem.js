import React, { useContext, useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DisplayPrice from "../common/DisplayPrice";
import DisplayPrice2 from "../common/DisplayPrice2";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button, Box, Tabs, Tab } from "@material-ui/core";
import html2canvas from "html2canvas"; // this is an edited version found here
import ShareCard from "./ShareCard/ShareCard";
import { WishlistContext } from "../../contexts/WishlistContext";
import { makeStyles } from "@material-ui/core/styles";

import StyledDialog from "../common/StyledDialog/StyledDialog";
import DialogClose from "../common/StyledDialog/TopSections/TopSection/DialogClose";

const styles = makeStyles({
  linkButton: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});
const tweetIntent = () => {
  window.open(
    `https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.wishtender.com%2Fdashiell%3Fitem%3D60f46d52cb7331cb7389d91b&via=WishTender&text=I%20just%20added%20a%20new%20item%20to%20my%20wishlist.%20Buy%20it%20for%20me.`,
    "popup",
    "width=600,height=600"
  );
};
const HowToTweet = (props) => {
  const [value, setValue] = useState(0);
  const classes = styles();
  return (
    <div style={{ height: "400px", width: "350px" }}>
      <Tabs
        value={value}
        onChange={(e, v) => {
          setValue(v);
        }}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="With Image"></Tab>
        <Tab label="Without Image"></Tab>
      </Tabs>
      <div hidden={value !== 0}>
        <ol>
          <li>
            <p>
              <a class={classes.linkButton} onClick={props.downloadImage}>
                Download
              </a>{" "}
              a sharable image.
            </p>
            <img
              width="250"
              style={{ border: "1px solid grey", borderRadius: "4px" }}
              // id={"share-thumbnail" + props.id}
              alt="share card preview"
              src={"images/share_card.png"}
            ></img>
          </li>
          <li>
            Use this{" "}
            <a class={classes.linkButton} onClick={tweetIntent}>
              sample tweet
            </a>
            .
          </li>
          <li>
            <p>Attach sharable image to the Tweet.</p>
            <img
              width="250"
              style={{ border: "1px solid grey", borderRadius: "4px" }}
              // id={"share-thumbnail" + props.id}
              alt="attach image"
              src={"images/attach_image.png"}
            ></img>
          </li>
        </ol>
      </div>
      <div hidden={value !== 1}>
        <ol>
          <li>
            Use this{" "}
            <a class={classes.linkButton} onClick={tweetIntent}>
              sample tweet
            </a>
            .
          </li>
        </ol>
      </div>
    </div>
  );
};
export default function MediaCard(props) {
  const [tweetHowTo, setTweetHowTo] = useState(false);
  const downloadImage = () =>
    html2canvas(document.querySelector(`#share-card-${props.id}`), {
      // allowTaint: true,

      useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
      onclone: function (clonedDoc) {
        clonedDoc.getElementById(`share-card-${props.id}`).style.display =
          "block";
      },
    })
      .then((canvas) => {
        var link = document.createElement("a");
        link.download = "wishtender_share_card.png";
        link.href = canvas.toDataURL();
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });

  const { wishlist } = useContext(WishlistContext);

  return (
    <Card className="wish_item">
      <CardActionArea>
        <div
          className="imageItem"
          style={{
            position: "relative",
            overflow: "hidden",
            paddingBottom: "100%",
            background: "white",
          }}
        >
          <img
            alt={props.itemName}
            src={props.imageUrl}
            style={{ position: "absolute", width: "100%" }}
          />
        </div>
        <CardContent>
          <Typography gutterBottom component="h2" color="textSecondary">
            {props.itemName}
            {/* {`${props.itemName.slice(0, 50)}${
              props.itemName.length > 40 ? "..." : ""
            }`} */}
          </Typography>
          <Typography color="textPrimary" className="price">
            <DisplayPrice2 priceObject={props.price} type="" />
          </Typography>
        </CardContent>
        {props.isAuth && (
          <Button
            style={{ float: "right" }}
            color="primary"
            endIcon={<TwitterIcon />}
            onClick={(e) => {
              e.stopPropagation();
              setTweetHowTo(true);
            }}
          >
            Share
          </Button>
        )}
      </CardActionArea>
      <div
        id={`share-card-${props.id}`}
        style={{
          position: "absolute",
          zIndex: 900,
          display: "none",
        }}
      >
        {/* {props.itemName ===
          "Rowdy Mermaid Kombucha Lion's Root (12 fl oz) - Instacart" && ( */}
        <ShareCard
          open={true}
          onClose={() => {}}
          item={wishlist.wishlistItems.find((i) => i._id === props.id)}
        />
        {/* )} */}
      </div>
      {/* <HowToTweet id={props.id}></HowToTweet> */}

      <StyledDialog
        onClick={(e) => {
          e.stopPropagation();
        }}
        onClose={(e) => {
          setTweetHowTo(false);
          e.stopPropagation();
        }}
        open={tweetHowTo}
      >
        <>
          <DialogClose
            onClose={(e) => {
              setTweetHowTo(false);
              e.stopPropagation();
            }}
          />

          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            alignItems="center"
            justifyContent="center"
            style={{
              gap: "14px",
              // width: "500px",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              backgroundPositionY: "-80px",

              maxHeight: "80%",
              padding: "40px",
              margin: "50px",
            }}
          >
            <HowToTweet
              id={props.id}
              downloadImage={downloadImage}
            ></HowToTweet>
          </Box>
        </>
      </StyledDialog>
    </Card>
  );
}
