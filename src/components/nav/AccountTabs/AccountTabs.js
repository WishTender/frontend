import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect, useRouteMatch } from "react-router-dom"; // a comment (can be deleted)
import { RouteContext } from "../../../contexts/RouteContext";
import { UserContext } from "../../../contexts/UserContext";
import theme from "../../../theme";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RedeemIcon from "@material-ui/icons/Redeem";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Badge from "@material-ui/core/Badge";
import { BrowserRouter as Router, Route } from "react-router-dom";
console.log(Router, Route);

export default function AccountTabs(props) {
  const [activeTab, setActiveTab] = useState(false);
  const [alias, setAlias] = useState(false);
  const routeContext = useContext(RouteContext);
  const userContext = useContext(UserContext);
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
      {alias && <Redirect to={`/${alias}`} />}
      <Tabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          onClick={async () => {
            const res = await fetch(
              `${process.env.REACT_APP_BASE_URL}/api/aliases?user=${userContext.user._id}`,
              { credentials: "include" }
            );
            const json = await res.json();
            setAlias(json.handle);
            setAlias(false);
          }}
          icon={<ListAltIcon />}
          label={props.screen === "xs" ? null : "Wishlist"}
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
          label={props.screen === "xs" ? null : "wish-tracker"}
        />
      </Tabs>
    </div>
  );
}
