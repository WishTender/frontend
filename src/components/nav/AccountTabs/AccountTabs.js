import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect, useRouteMatch } from "react-router-dom"; // a comment (can be deleted)
import { RouteContext } from "../../../contexts/RouteContext";
import { UserContext } from "../../../contexts/UserContext";
import { NotificationContext } from "../../../contexts/NotificationContext";
import theme from "../../../theme";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RedeemIcon from "@material-ui/icons/Redeem";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core";
import { fetchGet } from "../../../scripts/fetchHelper";
console.log(Router, Route);
// const useStyles = makeStyles({
//   top: "10px",
//   border: "1px solid blue",
//   tabToolTip: {
//     "$.MuiTooltip-tooltip": {
//       top: "10px",
//       border: "1px solid red",
//     },
//     "$ .MuiTooltip-tooltip": {
//       top: "10px",
//       border: "1px solid red",
//     },
//     "$..MuiTooltip-popper": {
//       top: "10px",
//       border: "1px solid red",
//     },
//     "$ .MuiTooltip-popper": {
//       top: "10px",
//       border: "1px solid red",
//     },
//   },
// });
const TabTooltip = withStyles({
  tooltip: {
    margin: 2,
  },
})(Tooltip);
export default function AccountTabs(props) {
  const [activeTab, setActiveTab] = useState(false);
  const [alias, setAlias] = useState(false);
  const [newGifts, setNewGifts] = useState(null);
  const routeContext = useContext(RouteContext);
  const userContext = useContext(UserContext);
  const notificationContext = useContext(NotificationContext);
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
        <TabTooltip title="Wishlist">
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
            // label={props.screen === "xs" ? null : "Wishlist"}
          />
        </TabTooltip>
        <TabTooltip title="Wish-Tracker">
          <Tab
            component={Link}
            to="/wish-tracker"
            icon={
              <Badge
                badgeContent={notificationContext.notifications}
                color="error"
              >
                <RedeemIcon />
              </Badge>
            }
            aria-label="Wish Tracker"
            // label={props.screen === "xs" ? null : "wish-tracker"}
          />
        </TabTooltip>
      </Tabs>
    </div>
  );
}
