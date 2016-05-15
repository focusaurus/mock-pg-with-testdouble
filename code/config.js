'use strict'

const joi = require('joi')
const _ = require('lodash')
const pg = require('pg')

function summarizeErrors (error, summary) {
  const parts = [summary || 'Invalid Data Provided']
  const paths = _.map(error.details, 'message')
  return parts.concat(paths).join('.\n')
}

const joiPort = joi.number().integer().min(1024).max(65535)

const schema = joi.object().keys({
  // http://www.postgresql.org/docs/9.3/static/libpq-envars.html
  PGDATABASE: joi.string().default('dev_mock_pg_with_testdouble'),
  PGHOST: joi.string().hostname().default(pg.defaults.host),
  PGPASSWORD: joi.string(),
  PGPORT: joiPort.default(pg.defaults.port),
  PGUSER: joi.string().default('postgres'),
  PORT: joiPort.default(3000)
})

const result = joi.validate(process.env, schema, {stripUnknown: true})

// export each configuration key from this commonjs module
Object.assign(exports, result.value)
delete exports.error // except the error

function validate () {
  if (result.error) {
    console.error(summarizeErrors(result.error, 'Invalid configuration'))
    process.exit(10)
  }
}

exports.validate = validate
