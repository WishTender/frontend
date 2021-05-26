import React from "react";
import { Box, Container, Typography, Button } from "@material-ui/core";
import theme from "../../../../theme";
import useScreenSize from "../../../../hooks/useScreenSize";
import ResponsiveDialogTitleSection from "../TopSections/ResponsiveTopTitleSection/ResponsiveDialogCloseAndTitleSection";
import ResponsiveFormButton from "./ResponsiveFormButton";

export default function ResponsiveForm(props) {
  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });
  const formStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    // textAlign: "center",
    // paddingBottom: screenSize === "sm" && theme.spacing(2),
  };
  const formContent = props.children.filter(
    (ch) => ch.type.name !== "ResponsiveFormButton"
  );
  const button = props.children.find(
    (ch) => ch.type.name === "ResponsiveFormButton"
  );
  return (
    <>
      <ResponsiveDialogTitleSection onClose={props.onClose}>
        {props.title}
      </ResponsiveDialogTitleSection>
      <Box display="flex" flexDirection="column" style={{ height: "100%" }}>
        <form style={formStyle} onSubmit={props.onSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1em",
              // padding:
              //   screenSize === "xs"
              //     ? theme.spacing(6, 0, 1, 0)
              //     : theme.spacing(4, 0, 1, 0),
              // width: "80%",
            }}
          >
            <div style={{ width: screenSize === "xs" ? "80%" : "80%" }}>
              {formContent}
            </div>
          </div>
          {button}
        </form>
      </Box>
    </>
  );
}
