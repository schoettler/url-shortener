const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/url')

router.post('/', Ctrl.shorten)
router.get('/:hash', Ctrl.getUrl)
router.get('/:hash/stats', Ctrl.getStats)

module.exports = router.routes()
