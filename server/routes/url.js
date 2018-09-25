const Router = require('koa-router')
const Ctrl = require('../controllers/url')

const router = new Router()

router.post('/', Ctrl.shorten)
router.get('/:hash', Ctrl.getUrl)
router.get('/:hash/stats', Ctrl.getStats)

module.exports = router.routes()
