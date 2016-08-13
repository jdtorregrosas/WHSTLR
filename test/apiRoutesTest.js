'use strict'

const request = require('supertest')
const app = require('../app')
const mock = require('./gitlab/helper/mockServer')

describe('# API Routes', () => {
  before('Starts the mock server',() => {
    mock.listen(2000)
  })
  const baseURL = 'localhost:2000'
  const token = 'token'
  it('# GET UserName', (done) => {
    request(app)
    .get(`/api/userName?baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })
  it('# GET Projects', (done) => {
    request(app)
    .get(`/api/projects?baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })
  it('# GET Tags', (done) => {
    request(app)
    .get(`/api/projects/140/tags?baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET One Tag by Name', (done) => {
    request(app)
    .get(`/api/projects/140/tags/v1.0.0?baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET Merge Requests since a date', (done) => {
    const testDate = new Date('2016-06-25')
    request(app)
    .get(`/api/projects/140/merges?since=${testDate}&baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET One Merge Request by Id', (done) => {
    request(app)
    .get(`/api/projects/140/merges/1456?baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET Commits from a merge request', (done) => {
    request(app)
    .get(`/api/projects/140/merges/1456/commits?baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
})
