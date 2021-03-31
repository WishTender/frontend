var path = require("path");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: process.env.BACKENDLOCAL ? 4000 : 8080,
    proxy: process.env.BACKENDLOCAL
      ? "https://localhost:4000"
      : "https://wishtender.herokuapp.com/",
  },
};
