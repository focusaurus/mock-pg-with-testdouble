'use strict'

const pg = require('./pg')
const supertest = require('supertest')
const td = require('testdouble')
const test = require('tape-catch')
const utils = require('./test-utils')

const request = supertest(require('./server'))

test('users by score: no results', (tape) => {
  td.replace(pg, 'query')
  td.when(pg.query(utils.isQuery(/\sfrom\s+users/im, ['1'])))
    .thenReturn(Promise.resolve([]))
  request
    .get('/users')
    .query({score: 1})
    .expect(200)
    .end((error, res) => {
      tape.error(error, 'should send a response')
      tape.deepEqual(res.body, [])
      tape.end()
    })
})

test('users by score: DB error', (tape) => {
  const down = new Error('DB is down')
  td.replace(pg, 'query')
  td.when(pg.query(utils.isQuery(/\sfrom\s+users/im, ['1'])))
    .thenReturn(utils.reject(down))
  request
    .get('/users')
    .query({score: 1})
    .expect(500)
    .end((error, res) => {
      tape.error(error, 'should send a response')
      tape.equal(res.text, down.message)
      tape.end()
    })
})

test('users by score: happy path', (tape) => {
  const users = [
    {name: 'tj', score: 545},
    {name: 'substack', score: 724}
  ]
  td.replace(pg, 'query')
  td.when(pg.query(utils.isQuery(/\sfrom\s+users/im, ['1'])))
    .thenReturn(Promise.resolve(users))
  request
    .get('/users')
    .query({score: 1})
    .expect(200)
    .end((error, res) => {
      tape.error(error, 'should send a response')
      tape.deepEqual(res.body, users)
      tape.end()
    })
})

test('teardown: testdouble reset', function (tape) {
  td.reset()
  tape.end()
})
