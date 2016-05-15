'use strict'

const _ = require('lodash')
const Bluebird = require('bluebird')
const td = require('testdouble')

const isQuery = td.matchers.create({
  name: 'isQuery',
  matches: (matcherArgs, actual) => {
    // We expect a SQLStatement instance from sql-template-strings package
    // should have properties .sql (String), .values (Array), and .text (String)
    if (typeof actual.sql !== 'string') {
      return false
    }

    // check if the SQL matches
    const sqlMatcher = matcherArgs[0]
    let sqlMatches = false
    if (typeof sqlMatcher === 'string') {
      // String just does a simple case-sensitive substring "includes" check
      if (actual.sql.includes(sqlMatcher)) {
        sqlMatches = true
      }
    }
    if (sqlMatcher instanceof RegExp) {
      // do a regular expression test
      sqlMatches = sqlMatcher.test(actual.sql)
    }
    if (!sqlMatches) {
      return false
    }

    // check if the values array matches
    const values = matcherArgs[1]
    return _.intersection(actual.values, values).length === values.length
  }
})

// The pattern in tests is to set up a simulated failure before
// the code being tested has a chance to attach rejection handlers.
// Thus we need to suppressUnhandledRejections to avoid bluebird
// printing spurious warnings
function reject (error) {
  const blue = Bluebird.reject(error)
  blue.suppressUnhandledRejections()
  return blue
}

exports.isQuery = isQuery
exports.reject = reject
