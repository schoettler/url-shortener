const DataTypes = require('sequelize')

const db = require('../lib/db')

const Url = db.define('Url', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  target: { 
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = Url