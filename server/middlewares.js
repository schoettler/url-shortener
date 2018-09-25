const bodyParser = require('koa-bodyparser')
const compress = require('koa-compress')
const cors = require('@koa/cors')
const helmet = require('koa-helmet')
const logger = require('koa-logger')
const respond = require('koa-respond')
const Router = require('koa-router')
const mount = require('koa-mount')
const serve = require('koa-static')
const path = require('path')

const loggingLayer = (app) => {
  if (process.env.NODE_ENV === 'development') {
    app.use(logger())
  }
}

const baseLayer = (app) => {
  app
    .use(helmet())
    .use(cors())
    .use(bodyParser({
      enableTypes: ['json'],
      jsonLimit: '5mb',
      strict: true,
      onerror: function (err, ctx) {
        ctx.throw(`body parse error: ${err}`, 422)
      }
    }))
    .use(respond())
}

const apiLayer = (app, apiRoutes) => {
  const apiRouter = new Router()

  apiRoutes(apiRouter)
  app
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())

  return apiRouter
}

const uiLayer = (app) => {
  app
    .use(compress())
    .use(
      mount('/client', serve(path.resolve(__dirname, '../client/build/')))
    )
}

module.exports = {
  loggingLayer,
  baseLayer,
  apiLayer,
  uiLayer
}
