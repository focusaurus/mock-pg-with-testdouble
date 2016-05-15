'use strict'

const joi = require('joi')
const pg = require('pg')

const joiPort = joi.number().integer().min(1024).max(65535)

// The keys below are the supported environment variables
// for this application and expected format
const schema = joi.object().keys({
  // http://www.postgresql.org/docs/9.3/static/libpq-envars.html
  PGDATABASE: joi.string().default('dev_mock_pg_with_testdouble'),
  PGHOST: joi.string().hostname().default(pg.defaults.host),
  PGPASSWORD: joi.string().default(pg.defaults.password),
  PGPORT: joiPort.default(pg.defaults.port),
  // PGUSER defaults to $USER which I think is useless
  PGUSER: joi.string().default('postgres'),
  PORT: joiPort.default(3000)
})

const result = joi.validate(process.env, schema, {stripUnknown: true})

/* istanbul ignore if */
if (result.error) {
  exports._error = 'Invalid configuration:\n' + result.error.details
    .map((error) => error.message)
    .join('.\n')
} else {
  // export each configuration key from this commonjs module
  Object.assign(exports, result.value)
}
