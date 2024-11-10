import { createProxyMiddleware } from "'http-proxy-middleware'"
module.exports = function (app) {
  console.log('xxxxxxxxxxxxxx')
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5147',
      changeOrigin: true,
    })
  )
}
