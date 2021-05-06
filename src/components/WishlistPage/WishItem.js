import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DisplayPrice from "../common/DisplayPrice";

export default function MediaCard(props) {
  return (
    <Card className="wish_item">
      <CardActionArea>
        <div
          className="imageItem"
          style={{
            position: "relative",
            overflow: "hidden",
            paddingBottom: "100%",
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
          </Typography>
          <Typography color="textPrimary" className="price">
            <DisplayPrice priceObject={props.price} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
