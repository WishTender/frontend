const styles = (theme) => {
  return {
    test: { color: "white" },
    "sign-up-wrapper": {
      height: "100%",
      width: "100%",
      backgroundImage:
        "url('/images/background_graphic_gradient_optimized_for_web.png')",
      backgroundSize: "cover",
      flexDirection: "row",
    },
    "sign-up-left-panel_xs": {
      height: "100%",
      width: "100%",
      borderRadius: 0,
      background: "linear-gradient(45deg, rgb(0 126 255 / 48%), #03b0e0)",
    },
    "sign-up-left-panel_mobile": {
      height: "100%",
      width: "100%",
      borderRadius: 0,
      background:
        "linear-gradient(45deg, rgb(0 126 255 / 0%), rgb(3 176 224 / 0%))",
    },
    "sign-up-left-panel_sm": {
      height: "100%",
      width: "50%",
      borderRadius: 0,
      justifyContent: "SpaceBetween",
      background: "linear-gradient(45deg, rgb(0 126 255 / 48%), #03b0e0)",
    },

    "sign-up-left-panel-container_mobile": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      height: "100%",
      gap: "20px",
      paddingTop: "20vw",
      overflow: "hidden",
      position: "relative",
    },
    "sign-up-left-panel-container_xs": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      height: "100%",
      gap: "20px",
      paddingTop: "17vw",
      overflow: "hidden",
      position: "relative",
    },
    "sign-up-left-panel-container_sm": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
      gap: "20px",
      overflow: "hidden",
      position: "relative",
    },
    "sign-up-text-1": {
      zIndex: "2",
      color: "white",
    },
    "sign-up-text-1_mobile": {
      fontSize: "5vw",
      maxWidth: "80vw",
    },
    "sign-up-text-1_xs": {
      fontSize: "2em",
      maxWidth: "80vw",
    },
    "sign-up-form_mobile": {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      width: "100%",
      zIndex: 3,
      maxWidth: "80vw",
    },
    "sign-up-form_not_mobile": {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      width: "100%",
      zIndex: 3,
    },
    button: { fontWeight: "600" },
    "sign-up-login_button": {
      color: "white",

      border: "1px solid white",
    },
    "img-wrapper-mobile-sm": {
      height: "40vh",
      position: "absolute",
      bottom: "2vh",
      zIndex: 0,
    },
  };
};

export default styles;
