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
    switch (typeof sqlMatcher) {
      case 'string':
        if (actual.sql.includes(sqlMatcher)) {
          sqlMatches = true
        }
        break
      case 'object':
        if (typeof sqlMatcher.test === 'function' && sqlMatcher.test(actual.sql)) {
          sqlMatches = true
        }
        break
    }
    if (!sqlMatches) {
      return false
    }

    // check if the values array matches
    const values = matcherArgs[1]
    return _.intersection(actual.values, values).length === values.length
  }
})

function reject (error) {
  const blue = Bluebird.reject(error)
  blue.suppressUnhandledRejections()
  return blue
}

exports.isQuery = isQuery
exports.reject = reject
