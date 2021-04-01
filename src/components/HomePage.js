import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";

function heroSection() {
  return (
    <div className="hero_section_container">
      <div className="hero_section">
        <div className="triangle"></div>
        <div className="text">
          <h3>WHAT YOU LOVE. FROM YOUR FANS.</h3>
          <h2>
            Universal Wishlist <br /> Safe Shipping
          </h2>
          <Button variant="contained">Create your free wishlist</Button>
        </div>
      </div>
    </div>
  );
}

function fourPointExplanation() {
  return (
    <Grid container spacing={3} className="wishtender_4point_explanation">
      <Grid item xs={12}>
        <h2 className="title">A free and safe way to share wishlists.</h2>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className="point">
          <div className="icon">
            <img src="images/icon_blue.png" alt="blue icon" />
          </div>
          <h3>One Stop Wishlist</h3>
          <p>
            Pick from any online store or create custom cash funds for college,
            travel, and more.
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className="point">
          <div className="icon">
            <img alt="icon" src="images/icon_blue.png" />
          </div>
          <h3>Secure Shipping</h3>
          <p>
            Keep your mailing address private so you can receive gifts safely.
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className="point">
          <div className="icon">
            <img src="images/icon_blue.png" alt="control orders icon" />
          </div>
          <h3>Control Orders</h3>
          <p>
            Have full control of your gifts. Return gifts based on the store
            policy, add to orders, pre-return, or delay orders.
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className="point">
          <div className="icon">
            <img src="images/icon_blue.png" alt="customize icon" />
          </div>
          <h3>Customizable</h3>
          <p>
            Create wish bundles, attach alternate sizes and colors to orders,
            keep sizes hidden, create special occasion lists, and more.
          </p>
        </Paper>
      </Grid>
    </Grid>
  );
}

function HomePage() {
  return (
    <div>
      {heroSection()}
      {fourPointExplanation()}
    </div>
  );
}

export default HomePage;
