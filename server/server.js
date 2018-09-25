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

// const bodyParser = require('koa-bodyparser')
// const cors = require('@koa/cors')
// const helmet = require('koa-helmet')
// const logger = require('koa-logger')
// const respond = require('koa-respond')
// const Router = require('koa-router')
// const mount = require('koa-mount')
// const serve = require('koa-static')
// const path = require('path')
//
// const app = new Koa()
//
// const router = new Router()
//
// app.use(helmet())
//
// if (process.env.NODE_ENV === 'development') {
//   app.use(logger())
// }
//
// app.use(cors())
// app.use(bodyParser({
//   enableTypes: ['json'],
//   jsonLimit: '5mb',
//   strict: true,
//   onerror: function (err, ctx) {
//     ctx.throw('body parse error', 422)
//   }
// }))
//
// app.use(respond())
//
// // API routes
// require('./routes/api')(router)
// app.use(router.routes())
// app.use(router.allowedMethods())
// app.use(mount('/client', serve(path.resolve(__dirname, '../public'))))
//
// module.exports = app
