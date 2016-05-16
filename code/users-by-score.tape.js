'use strict'

const Bluebird = require('bluebird')
const supertest = require('supertest')
const td = require('testdouble')
const test = require('tape-catch')
const User = require('./user-model')
const request = supertest(require('./server'))

function setupMocks () {
  td.replace(User, 'findAll')
  return td.when(User.findAll({where: {score: {$gt: '1'}}}))
}

test('users by score: no results', (tape) => {
  setupMocks().thenReturn(Bluebird.resolve([]))
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
  setupMocks().thenDo(() => Bluebird.reject(down))
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
    {id: 1, name: 'tj', score: 545},
    {id: 2, name: 'substack', score: 724}
  ]
  setupMocks().thenReturn(Bluebird.resolve(users))
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
