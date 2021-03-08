import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RedeemIcon from "@material-ui/icons/Redeem";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Badge from "@material-ui/core/Badge";

export default function AccountTabs() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab icon={<ListAltIcon />} aria-label="Wishlist" label="Wishlist" />

        <Tab
          icon={
            <Badge badgeContent={1} color="error">
              <RedeemIcon />
            </Badge>
          }
          aria-label="Wish Tracker"
          label="Wish Tracker"
        />
      </Tabs>
    </div>
  );
}
