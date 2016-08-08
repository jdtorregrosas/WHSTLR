'use strict'

const store = require('../routes/store')
const mock = require('./gitlab/helper/mockServer')
const request = require('supertest')
const app = require('../app')

describe('# Routes', () => {
  before('Configuration', () => {
    store.config.baseURL = 'localhost:2000'
    store.config.token = 'asdfghjkl'
  })
  it('# GET Projects', (done) => {
    request(app)
    .get('/projects')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })
  it('# GET One Project by ID', (done) => {
    request(app)
    .get('/projects/140')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET Tags', (done) => {
    request(app)
    .get('/projects/140/tags')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET One Tag by Name', (done) => {
    request(app)
    .get('/projects/140/tags/v1.0.0')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET Merge Requests since a date', (done) => {
    const testDate = new Date('2016-06-25')
    request(app)
    .get(`/projects/140/merges?since=${testDate}`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET One Merge Request by Id', (done) => {
    request(app)
    .get(`/projects/140/getMerges/1456`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET Commits from a merge request', (done) => {
    const testDate = new Date('2016-06-25')
    request(app)
    .get(`/projects/140/merges/1456/commits`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
})
