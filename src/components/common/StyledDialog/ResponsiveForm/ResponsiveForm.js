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
  };
  const formContent = props.children.filter(
    (ch) => ch.type.name !== "ResponsiveFormButton"
  );
  const button = props.children.find(
    (ch) => ch.type.name === "ResponsiveFormButton"
  );
  return (
    <>
      <ResponsiveDialogTitleSection
        style={{ textAlign: "center" }}
        onClose={props.onClose}
      >
        {props.title}
      </ResponsiveDialogTitleSection>
      <Box display="flex" flexDirection="column" style={{ height: "100%" }}>
        <form style={formStyle} onSubmit={props.onSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div style={{ width: "80%", height: "100%" }}>{formContent}</div>
          </div>
          {button}
        </form>
      </Box>
    </>
  );
}
