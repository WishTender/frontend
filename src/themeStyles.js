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
        borderRadius: theme.shape.borderRadius,
        padding: "1px",
        background: gradient,
        "-webkitMask":
          "linear-gradient(#fff 0 0) content-box,  linear-gradient(#fff 0 0)",
        "-webkitMaskComposite": "destination-out",
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
      "-webkitTextFillColor": "black",
    },
  };
};

const styles = makeStyles({
  gradient: gradientStyles(
    theme.palette.primary.mainGradient,
    theme.palette.primary.darkGradient
  ),
  lightGradient: gradientStyles(
    theme.palette.primary.lightGradient,
    theme.palette.primary.mainGradient
  ),
});

export default styles;
