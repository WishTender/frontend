import React from "react";
import DialogTitleSection from "./DialogTitleSection";
import DialogTitleSectionXs from "./DialogTitleSectionXs";
import useScreenSize from "../../../../../hooks/useScreenSize";

export default function ResponsiveDialogTitleSection(props) {
  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });
  return (
    <>
      {screenSize === "sm" ? (
        <DialogTitleSection>{props.children}</DialogTitleSection>
      ) : (
        <DialogTitleSectionXs>{props.children}</DialogTitleSectionXs>
      )}
    </>
  );
}
