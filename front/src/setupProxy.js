const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      "/api", 
    createProxyMiddleware({
      target: `${process.env.REACT_APP_API_URL}`,
      changeOrigin: true
    })
  );

  app.use(
    "/ws",
    createProxyMiddleware({ target: "http://localhost:8787", ws: true })
);


};