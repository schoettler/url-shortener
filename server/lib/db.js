const Sequelize = require('sequelize')
const path = require('path')

const db = new Sequelize('url-shortener', '', '', {
  host: 'localhost',
  dialect: 'sqlite',

  storage: path.resolve(__dirname, '../url-shortener.sqlite'),

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
})

module.exports = db
