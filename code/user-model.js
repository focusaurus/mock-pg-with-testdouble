'use strict'

const sequelize = require('./pg').sequelize
const Sequelize = require('Sequelize')

module.exports = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.INTEGER
  }
})
