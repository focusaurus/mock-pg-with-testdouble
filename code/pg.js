'use strict'

const config = require('./config')
const pg = require('pg')

// set up pg defaults
pg.defaults.database = config.PGDATABASE
pg.defaults.host = config.PGHOST
pg.defaults.password = config.PGPASSWORD
pg.defaults.port = config.PGPORT
pg.defaults.user = config.PGUSER

exports.query = require('pg-query-bluebird')
exports.SQL = require('sql-template-strings')
