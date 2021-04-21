import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountBoxSharpIcon from "@material-ui/icons/AccountBoxSharp";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "../AppBar/AppBar";
import AppBarSmall from "../AppBarSmall/AppBarSmall";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "./MenuSmall.css";
import { UserContext } from "../../../contexts/UserContext";

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Menu(props) {
  const { user } = useContext(UserContext);

  const breakpoint = 600;
  const [smallScreen, setSmallScreen] = React.useState(
    window.innerWidth < breakpoint
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [headerHeight, setHeaderHeight] = React.useState(null);

  const [buttonHeight, setButtonHeight] = React.useState(null);
  const [buttonWidth, setButtonWidth] = React.useState(null);

  React.useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < breakpoint && !smallScreen) setSmallScreen(true);
      else if (window.innerWidth >= breakpoint && smallScreen)
        setSmallScreen(false);
    };
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [smallScreen]);

  const handleClick = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
      console.log("set to null");
    } else {
      var header = document.getElementsByTagName("header")[0];
      var button = document.getElementsByTagName("header")[0].children[0]
        .children[0];

      setHeaderHeight(header.clientHeight);
      setButtonHeight(header.clientHeight);
      setButtonWidth(button.clientWidth + button.offsetLeft);
      setAnchorEl(header);
      console.log(anchorEl);
    }
  };

  return (
    <div>
      {smallScreen ? (
        <AppBarSmall openMenu={handleClick} screen="xs" />
      ) : (
        <AppBarSmall openMenu={handleClick} />
      )}
      {smallScreen && (
        <div>
          <div
            className={`container_for_main_menu ${
              anchorEl ? "m-fadeIn" : "m-fadeOut"
            }`}
          >
            <div
              className="flex"
              style={{ height: buttonHeight, width: buttonWidth }}
            >
              <IconButton edge="start" onClick={handleClick} className="close">
                <CloseIcon />
              </IconButton>
            </div>

            <div className={`main_menu `} style={{ top: headerHeight }}>
              {!user && (
                <StyledMenuItem style={{ background: "#ffdf5769" }}>
                  <ListItemIcon>
                    <BorderColorRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Sign Up" />
                </StyledMenuItem>
              )}
              <StyledMenuItem>
                <ListItemIcon>
                  <AccountBoxIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={!user ? "Log In" : "Log Out"} />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Shopping Cart" />
              </StyledMenuItem>
            </div>
          </div>
        </div>
      )}
      {/* this div pushes all the divs under the header out from under dynamicalled*/}
    </div>
  );
}
