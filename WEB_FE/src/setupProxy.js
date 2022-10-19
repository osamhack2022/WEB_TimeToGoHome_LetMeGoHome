const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
