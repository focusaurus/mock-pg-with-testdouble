'use strict'

const main = require.main === module
const config = require('./config')
const express = require('express')
const pg = require('./pg')

// if starting the real server and the config isn't valid, exit right away
if (main && config._error) {
  console.error(config._error)
  process.exit(10)
}

const app = express()

app.get('/users', (req, res, next) => {
  const score = req.query.score
  const selectUsers = pg.sql`SELECT * FROM users WHERE score >= ${score}`
  pg.query(selectUsers)
    .then((users) => {
      res.send(users)
    })
    .catch(next)
})

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500)
  res.send(error.message)
})

if (main) {
  const server = app.listen(config.PORT, () => {
    console.log('http://localhost:', server.address().port)
  })
}

module.exports = app
