import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import React from 'react';
// import './App.css';
import "./myapp.css";

import HomePage from "./components/HomePage";

import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import { ThemeProvider } from "@material-ui/styles";
// import './Styles/App.css';

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
      main: green[500],
    },
  },
});

function App(props) {
  const user = {
    bannerPicUrl: "images/banner_pic.png",
    profilePicUrl: "images/profile_pic.png",
    displayName: "Brittany K.",
    name: { first: "Brittany", last: "Kochover" },
    profileMessage: "Love you guys <3",
    wishlistItems: [
      {
        itemName: "YSL Stilettos",
        price: "1000.00",
        imageUrl: "images/heels.png",
      },
      {
        itemName: "Reformation Dress",
        price: "300.00",
        imageUrl: "images/dress.png",
      },
      {
        itemName: "Night Pallette",
        price: "37.00",
        imageUrl: "images/makeup.png",
      },
    ],
  };
  return (
    //
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <Header /> */}
        {/* <AppBar position="fixed"/> */}
        <Router>
          <Route path="/" exact component={HomePage} />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
