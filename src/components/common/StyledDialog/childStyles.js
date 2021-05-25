import makeStyles from "@material-ui/core/makeStyles";
const childStyles = makeStyles((theme) => ({
  closeButtonV1: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    padding: "0 0 40px 0",
    "& h2.MuiTypography-root": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  title_xs: {
    position: "absolute",
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    padding: "0",
    left: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "center",
    width: "100%",
    height: "4em",
    "& h2.MuiTypography-root": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  closeButton: {
    position: "absolute",
    right: "3%",
    top: "3%",
  },
  closeButton_xs: { color: "white" },
  submit: { borderRadius: "0" },

  submit_xs: {
    position: "fixed",
    bottom: "0",
    left: "0",
    height: "4em",
    borderRadius: "0",
    width: "100%",
    fontWeight: "900",
  },
  dialogContent: {},
  dialogContent_xs: {
    top: "20vh",
    position: "relative",
  },
  titleText_xs: { right: "14%", position: "relative" },
}));
