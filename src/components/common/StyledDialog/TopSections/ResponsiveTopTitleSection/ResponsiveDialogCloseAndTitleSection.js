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
        <DialogTitleSection onClose={props.onClose}>
          {props.children}
        </DialogTitleSection>
      ) : (
        <DialogTitleSectionXs onClose={props.onClose}>
          {props.children}
        </DialogTitleSectionXs>
      )}
    </>
  );
}
