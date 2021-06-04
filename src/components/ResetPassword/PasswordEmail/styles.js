const styles = (theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      margin: "auto",
      gap: "2vh",
      width: "fit-content",
    },
    container_xs: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      justifyItems: "center",
      flexDirection: "column",
      gap: "2vh",
      margin: "auto",
      maxWidth: "80vw",
      height: "100%",
    },
    text1_xs: { fontSize: "7.7vw", paddingTop: "6vh" },
    text2_xs: { fontSize: "4vw" },
    // button: { alignSelf: "flex-end" },
  };
};
export default styles;
