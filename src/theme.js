import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      main: "#02bff2",
    },
    secondary: {
      main: "#aaa",
    },
  },
  shape: {
    // borderRadius: 50,
  },
  // spacing: { spacing: 4 },
});
theme.overrides = {
  MuiButton: {
    root: { borderRadius: 50 },
  },
  MuiTab: {
    root: {
      minHeight: "72px",
    },
  },
  MuiTabs: {
    root: {
      padding: "0px 9px",
    },
    indicator: {
      height: "8px",
      borderRadius: "4px 4px 0 0",
    },
  },
};

export default theme;
