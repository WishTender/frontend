const styles = (theme) => {
  return {
    "set-up-wrapper": {
      backgroundImage:
        "url('/images/background_graphic_gradient_optimized_for_web.png')",
      backgroundSize: "cover",
    },
    "set-up-wrapper_xs": {
      borderTop: "3px solid " + theme.palette.primary.main,
      position: "relative",
    },
    "set-up-container": {
      padding: theme.spacing("4"),
    },
    "set-up-container_xs": {
      borderRadius: 0,
      maxWidth: "none",
      background: "rgb(255 255 255 / 71%)",
      position: "absolute",
      height: "100%",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      margin: 0,
    },
    "set-up-text1": {
      color: "white",
      fontSize: "2em",
    },
    "set-up-text1_xs": {
      zIndex: 3,
      color: theme.palette.primary.main,
      paddingBottom: theme.spacing(2),
      fontSize: "1em",
    },

    "set-up-form": {
      display: "flex",
      maxWidth: "80vw",
      flexDirection: "column",
      gap: theme.spacing(3),
    },
    progressError: {
      "& .MuiLinearProgress-bar": { backgroundColor: theme.palette.error.main },
    },
    progressSuccess: {
      "& .MuiLinearProgress-bar": { backgroundColor: "greenyellow" },
    },
    button: { fontWeight: "600" },
  };
};

export default styles;
