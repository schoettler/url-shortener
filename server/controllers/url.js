const shortid = require('shortid')

const Url = require('../models/Url')

const Visitor = require('../models/Visitor')

exports.shorten = async function (ctx) {
  const { target } = ctx.request.body
  const id = shortid.generate()

  const url = await Url.create({ id, target })

  ctx.body = {
    hash: url.id,
    target: url.target
  }
}

exports.getUrl = async function (ctx) {
  const { hash } = ctx.params
  let short
  try {
    short = await Url.findById(hash)

    if (short === null) ctx.throw(404)
  } catch (err) {
    ctx.throw(404)
  }

  // capture analytics
  const visitorIp = ctx.request.ip
  const userAgent = ctx.request.header['user-agent']
  try {
    await Visitor.create({
      ip: visitorIp,
      user_agent: userAgent,
      url_id: short.id
    })
  } catch (err) {
    console.error(err)
  }

  ctx.redirect(short.target)
}

exports.getStats = async function (ctx) {
  const { hash } = ctx.params

  const uniqueVisitorsCount = await Visitor.uniqueCountByHash(hash)
  const uniqueVisitors = await Visitor.findVisitorsByHash(hash)
  const visits = await Visitor.findVisitsByHash(hash)

  ctx.body = {
    uniqueVisitorsCount,
    uniqueVisitors,
    visits
  }
}
