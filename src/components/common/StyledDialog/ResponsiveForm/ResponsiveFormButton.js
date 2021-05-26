import { Button } from "@material-ui/core";
import React from "react";
import useScreenSize from "../../../../hooks/useScreenSize";
import themeStyles from "../../../../themeStyles";

const ResponsiveFormButton = (props) => {
  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });
  const themeClasses = themeStyles(props);
  const buttonProps = {
    id: "responsive_dialog_form_button",
    disableElevation: true,
    variant: "contained",
    color: "primary",
    size: "large",
    type: "submit",
    className:
      screenSize === "xs"
        ? themeClasses.dialogSubmitMobile
        : themeClasses.dialogSubmit,
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: screenSize === "xs" ? null : "20px 0",
      }}
    >
      <Button {...buttonProps}>{props.children}</Button>
    </div>
  );
};
export default ResponsiveFormButton;
