const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://petercode.kro.kr",
      changeOrigin: true,
    })
  );
};
