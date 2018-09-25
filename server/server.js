const Koa = require('koa')
const {
  loggingLayer,
  baseLayer,
  apiLayer,
  uiLayer
} = require('./middlewares')

const app = new Koa()
const apiRoutes = require('./routes')

loggingLayer(app)
baseLayer(app)
apiLayer(app, apiRoutes)
uiLayer(app)

module.exports = app
