import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "../AppBar/AppBar";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "./Menu.css";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [headerHeight, setHeaderHeight] = React.useState(null);

  const [buttonHeight, setButtonHeight] = React.useState(null);
  const [buttonWidth, setButtonWidth] = React.useState(null);

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
      <AppBar openMenu={handleClick} />
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
            <StyledMenuItem>
              <ListItemIcon>
                <SearchOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Find A Wishlist" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemIcon>
                <ShoppingCartOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Shopping Cart" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemIcon>
                <HelpOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </StyledMenuItem>
          </div>
        </div>
      </div>
      {/* this div pushes all the divs under the header out from under dynamicalled*/}
    </div>
  );
}
