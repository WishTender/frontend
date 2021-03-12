import React, { useState, useContext, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
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
  const [activeTab, setActiveTab] = useState(false);
  const routeContext = useContext(RouteContext);
  const match = useRouteMatch(
    routeContext.allRoutes.filter((route) => route !== "/:alias")
  );
  const isProfileRoute = !match.isExact;
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  useEffect(() => {
    let val;
    if (isProfileRoute && routeContext.isCurrentUsersProfile) {
      val = 0;
    } else if (match.path === "/wish-tracker") {
      val = 1;
    } else {
      val = false;
    }
    setActiveTab(val);
  }, [isProfileRoute, match.path, routeContext.isCurrentUsersProfile]);
  return (
    <div>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          component={Link}
          to="/dadasheshe1"
          icon={<ListAltIcon />}
          label="dut"
        />

        <Tab
          component={Link}
          to="/wish-tracker"
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
