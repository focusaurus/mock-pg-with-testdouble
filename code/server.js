#!/usr/bin/env node
'use strict'

const main = require.main === module
const config = require('./config')
const express = require('express')
const User = require('./user-model')

// if starting the real server and the config isn't valid, exit right away
/* istanbul ignore if */
if (main && config._error) {
  console.error(config._error)
  process.exit(10)
}

const app = express()

app.get('/users', (req, res, next) => {
  const score = req.query.score
  User.findAll({where: {score: {$gt: score}}})
    .then((users) => res.send(users))
    .catch(next)
})

app.use((error, req, res, next) => {
  // statusCode works well with the httperrors module, which I like
  res.status(error.statusCode || 500)
  res.send(error.message)
})

/* istanbul ignore if */
if (main) {
  const server = app.listen(config.PORT, () => {
    console.log('http://localhost:', server.address().port)
  })
}

module.exports = app
