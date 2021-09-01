import { makeStyles, Tooltip } from "@material-ui/core";
import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      "& a": { color: theme.palette.primary.dark, fontWeight: "bold" },
      height: "fit-content",
      padding: "40px 0 60px 0",
      position: "relative",
      marginTop: "auto",
      bottom: "0",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      backgroundColor: theme.palette.primary.extraLight,
    },
    footer_section: {
      display: "flex",
      padding: "30px",
      flexDirection: "column",
      gap: "1em",
    },
    image_container: {
      width: "230px",
      "& img": {
        width: "100%",
      },
    },
  };
});
export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <div className={classes.footer_section}>
        <div className={classes.image_container}>
          <img src="/images/logo_transparent_background.png" alt="logo" />
        </div>
        <div className={classes.image_container}>
          <img src="/images/powered-by-Stripe.png" alt="powered by stripe" />
        </div>
      </div>
      <div className={classes.footer_section}>
        <h2>Info</h2>
        <a target="_blank" href="files/terms-9-1-21.pdf">
          Terms and Conditions
        </a>
        <a target="_blank" href="files/privacy-9-1-21.pdf">
          Privacy Policy
        </a>
      </div>
      <div className={classes.footer_section}>
        <h2>Contact</h2>
        <div>support@wishtender.com </div>
        <div style={{ gap: "1em", display: "flex" }}>
          <a href="https://twitter.com/WishTender">
            <TwitterIcon />
          </a>
          <a href="https://instagram.com/WishTenderapp">
            <InstagramIcon />
          </a>
        </div>
        <div>
          <div style={{ gap: ".5em", display: "flex", alignItems: "center" }}>
            Built By Dashiell Bark-Huss:
            <Tooltip
              title={
                <img
                  style={{ borderRadius: "50%" }}
                  height="70"
                  width="70"
                  src="https://pbs.twimg.com/profile_images/1088531842918244352/WVeHmdkb_400x400.jpg"
                  alt="dash twitter"
                />
              }
            >
              <a href="https://twitter.com/DashBarkHuss">
                <TwitterIcon />
              </a>
            </Tooltip>
          </div>
          (You can contact me here ^ too!)
        </div>
      </div>
    </div>
  );
}
