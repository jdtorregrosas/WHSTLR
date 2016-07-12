'use strict'

const mock = require('./mockServer.js')
const request = require('supertest')

it('', (done) => {
  request(mock)
  .post('/api/v3/projects')
  .send('hallo')
  .end((err, res) => {
    if (err) console.log(err)
    else console.log(res.body)
    done()
  })
})
