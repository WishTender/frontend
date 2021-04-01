import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import { displayPrice } from "../../scripts/helpers";

export default function MediaCard(props) {
  const clientCurrency = useContext(CurrencyContext);
  const localeContext = useContext(LocaleContext);

  return (
    <Card className="wish_item">
      <CardActionArea>
        {/* <CardMedia
          className={classes.media}
          image="/images/dress.png"
          title="Contemplative Reptile"
        /> */}
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
            {/* en should actual be current user language */}
            {/* How to get en? from browser then set in user context? */}
            {displayPrice(
              props.price,
              props.currency,
              clientCurrency,
              props.convertRate,
              localeContext
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
