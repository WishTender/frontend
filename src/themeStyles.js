import { makeStyles } from "@material-ui/core/styles";
import theme from "./theme";

const gradientStyles = (gradient, hoverGradient) => {
  return {
    background: theme.palette.primary.mainGradient,
    "-webkitBackgroundClip": "text",
    "-webkitTextFillColor": "transparent",
    "&.MuiButton-outlined": {
      background: gradient,
      "-webkitBackgroundClip": "text",
      "-webkitTextFillColor": "transparent",
      border: "0px",

      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius:
          theme.overrides?.MuiButton?.root.borderRadius ||
          theme.shape.borderRadius,
        padding: "1px",
        background: gradient,
        "-webkitMask":
          "linear-gradient(#fff 0 0) content-box,  linear-gradient(#fff 0 0)",
        "-webkitMaskComposite": "destination-out",
      },
      "&:hover": {
        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 50,
          padding: "1px",
          background: "rgba(0, 0, 0, 0.04)",
          // doesn't do anything
          // transition:
          //   "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", // does nothing
          zIndex: "-1",
        },
      },
    },
    "&.MuiButton-contained": {
      "-webkitBackgroundClip": "unset",
      "-webkitTextFillColor": theme.palette.primary.contrastText,
      "&:hover": {
        background: hoverGradient,
      },
    },
    "&.MuiFab-root": {
      "-webkitBackgroundClip": "unset",
      "-webkitTextFillColor": "black",
    },
    "& .MuiBadge-badge": {
      background: gradient,

      "-webkitBackgroundClip": "unset",
      "-webkitTextFillColor": theme.palette.primary.contrastText,
    },
  };
};

const styles = makeStyles({
  margin: { margin: theme.spacing(1) },

  gradient: gradientStyles(
    theme.palette.primary.mainGradient,
    theme.palette.primary.mainGradientReverse
  ),
  lightGradient: gradientStyles(
    theme.palette.primary.lightGradient,
    theme.palette.primary.lightGradientReverse
  ),
  dialogSubmitMobile: {
    position: "relative",
    bottom: "0",
    left: "0",
    height: "3em",
    borderRadius: "0",
    width: "100%",
    fontWeight: "900",
  },
  dialogSubmit: {
    position: "relative",
    height: "3em",
    borderRadius: "0",
    fontWeight: "900",
    width: "80%",
  },
  dialogSubmitMobileProgressWrap: {
    position: "relative",
    bottom: "0",
    left: "0",
    height: "3em",
    borderRadius: "0",
    width: "100%",
    fontWeight: "900",
  },
  dialogSubmitMobileProgress: {
    position: "relative",

    height: "3em",
    borderRadius: "0",
    width: "100%",
    fontWeight: "900",
  },
  dialogSubmitProgressWrap: {
    position: "relative",
    width: "80%",
  },
  dialogSubmitProgress: {
    position: "relative",
    height: "3em",
    borderRadius: "0",
    fontWeight: "900",
  },
});

export default styles;
