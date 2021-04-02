import React from "react";
import LandingAppBar from "./LandingAppBar";

export default function LandingPageMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [headerHeight, setHeaderHeight] = React.useState(null);

  // const [buttonHeight, setButtonHeight] = React.useState(null);
  // const [buttonWidth, setButtonWidth] = React.useState(null);

  const handleClick = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
      console.log("set to null");
    } else {
      var header = document.getElementsByTagName("header")[0];
      // var button = document.getElementsByTagName("header")[0].children[0]
      //   .children[0];

      // setHeaderHeight(header.clientHeight);
      // setButtonHeight(header.clientHeight);
      // setButtonWidth(button.clientWidth + button.offsetLeft);
      setAnchorEl(header);
      console.log(anchorEl);
    }
  };

  return (
    <div>
      <LandingAppBar openMenu={handleClick} />
      {/* this div pushes all the divs under the header out from under dynamicalled*/}
    </div>
  );
}
