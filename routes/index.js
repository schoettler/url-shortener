module.exports = (router) => {
  router.prefix('/v1')
  router.use('/url', require('./url'))
}
