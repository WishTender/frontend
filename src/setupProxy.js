const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/data"], // You can pass in an array too eg. ['/api', '/another/path']
    // createProxyMiddleware({
    //   target: "http://localhost:4000",

    //   changeOrigin: true,
    // })
    createProxyMiddleware({
      target:
        // not true if environment variables have booleans...
        process.env.BACKENDLOCAL === "true" || process.env.BACKENDLOCAL
          ? "http://localhost:4000"
          : "https://api.wishtender.com/",
      changeOrigin: true,
    })
  );
};
