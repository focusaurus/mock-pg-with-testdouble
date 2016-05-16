'use strict'

const config = require('./config')
const Sequelize = require('sequelize')

const sequelizeOptions = {
  host: config.PGHOST,
  dialect: 'postgres',
  define: {
    timestamps: false
  }
}

exports.sequelize = new Sequelize(
  config.PGDATABASE,
  config.PGUSER,
  config.PGPASSWORD,
  sequelizeOptions
)
