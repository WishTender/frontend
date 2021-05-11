const styles = (theme) => {
  return {
    "set-up-wrapper": {
      backgroundImage:
        "url('/images/background_graphic_gradient_optimized_for_web.png')",
      backgroundSize: "cover",
    },
    "set-up-container": {
      justifyContent: "SpaceBetween",
      paddingTop: theme.spacing("2"),
      paddingBottom: theme.spacing("2"),
      // background: "linear-gradient(45deg, rgb(0 126 255 / 48%), #03b0e0)",
    },
    "set-up-text1": {
      color: "white",
      fontSize: "2em",
    },

    "set-up-form": {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2),
    },
    button: { fontWeight: "600" },
  };
};

export default styles;
