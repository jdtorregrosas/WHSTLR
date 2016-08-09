'use strict'

const request = require('supertest')
const app = require('../app')
require('./gitlab/helper/mockServer')

describe('# API Routes', () => {
  before('Configuration', (done) => {
    request(app)
    .post('/api/config')
    .send({
      baseURL: 'localhost:2000',
      token: 'token'
    }).expect(200, done)
  })
  it('# GET config', (done) => {
    request(app)
    .get('/api/config')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })
  it('# GET Projects', (done) => {
    request(app)
    .get('/api/projects')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })
  it('# GET Tags', (done) => {
    request(app)
    .get('/api/projects/140/tags')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET One Tag by Name', (done) => {
    request(app)
    .get('/api/projects/140/tags/v1.0.0')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET Merge Requests since a date', (done) => {
    const testDate = new Date('2016-06-25')
    request(app)
    .get(`/api/projects/140/merges?since=${testDate}`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET One Merge Request by Id', (done) => {
    request(app)
    .get('/api/projects/140/merges/1456')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET Commits from a merge request', (done) => {
    request(app)
    .get('/api/projects/140/merges/1456/commits')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
})
