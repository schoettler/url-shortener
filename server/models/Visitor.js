const DataTypes = require('sequelize')
const db = require('../lib/db')

const Url = require('./Url')

const Visitor = db.define('Visitor', {
  ip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_agent: {
    type: DataTypes.STRING
  },
  url_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Url,
      key: 'id'
    }
  }
})

Visitor.uniqueCountByHash = async function (hash) {
  const res = await db.query(`
    SELECT COUNT(DISTINCT ip) AS \`count\` 
    FROM Visitors 
    WHERE Visitors.url_id = '${hash}'; 
  `)

  return res[0][0].count
}

Visitor.findVisitorsByHash = async function (hash) {
  const res = await db.query(`
    SELECT DISTINCT(ip) as ip, user_agent as 'user agent' 
    FROM Visitors
    WHERE url_id = '${hash}' 
    ORDER BY ip ASC
  `)

  return res[0]
}

Visitor.findVisitsByHash = async function (hash) {
  const res = await db.query(`
    SELECT ip, createdAt AS visitedAt
    FROM Visitors
    WHERE url_id = '${hash}' 
    ORDER BY ip ASC
  `)

  return res[0]
}

module.exports = Visitor
