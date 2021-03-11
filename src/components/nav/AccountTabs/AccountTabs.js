import React, { useState, useContext, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { RouteContext } from "../../../contexts/RouteContext";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RedeemIcon from "@material-ui/icons/Redeem";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Badge from "@material-ui/core/Badge";
import {
  NavLink,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
console.log(Router, Route);

export default function AccountTabs(props) {
  const [activeTab, setActiveTab] = useState(null);
  const routeContext = useContext(RouteContext);
  const match = useRouteMatch(routeContext.allRoutes.slice(0, -1));
  const isProfileRoute = !match.exact;
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  useEffect(() => {
    let val;
    if (isProfileRoute && routeContext.isCurrentUsersProfile) {
      val = 0;
    } else if (match.path === "wishlist") {
      val = 1;
    }
    setActiveTab(val);
  }, []);
  return (
    <div>
      <Link
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab icon={<ListAltIcon />} label="wishlist" />

        <Tab
          icon={
            <Badge badgeContent={1} color="error">
              <RedeemIcon />
            </Badge>
          }
          aria-label="Wish Tracker"
          label="wish-tracker"
        />
      </Tabs>
    </div>
  );
}
