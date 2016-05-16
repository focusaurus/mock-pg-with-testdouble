'use strict'

const Bluebird = require('bluebird')

// The pattern in tests is to set up a simulated failure before
// the code being tested has a chance to attach rejection handlers.
// Thus we need to suppressUnhandledRejections to avoid bluebird
// printing spurious warnings
function reject (error) {
  const blue = Bluebird.reject(error)
  blue.suppressUnhandledRejections()
  return blue
}

exports.reject = reject
