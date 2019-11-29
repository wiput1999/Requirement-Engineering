const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/emotion',
    proxy({
      target: 'http://35.236.184.82:8080',
      changeOrigin: true,
    })
  );
};