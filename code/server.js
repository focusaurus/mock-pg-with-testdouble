'use strict'

const config = require('./config')
const express = require('express')
const pg = require('./pg')

const app = express()

app.get('/users', (req, res, next) => {
  const score = req.query.score
  const selectUsers = pg.SQL`SELECT * FROM users WHERE score >= ${score}`
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

if (require.main === module) {
  config.validate()
  const server = app.listen(config.PORT, () => {
    console.log('http://localhost:' + server.address().port)
  })
}

module.exports = app
