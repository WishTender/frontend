const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // You can pass in an array too eg. ['/api', '/another/path']
    createProxyMiddleware({
      target:
        // not true if environment variables have booleans...
        process.env.BACKENDLOCAL === "true" || process.env.BACKENDLOCAL
          ? "http://localhost:4000"
          : "https://wishtender.herokuapp.com/",
      changeOrigin: true,
    })
  );
};
