var path = require("path");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
    // port: process.env.BACKENDLOCAL ? 4000 : 8080,
    proxy: "https://localhost:4000",
    // proxy: process.env.BACKENDLOCAL
    //   ? "https://localhost:4000"
    //   : "https://wishtender.herokuapp.com/",
  },
};
