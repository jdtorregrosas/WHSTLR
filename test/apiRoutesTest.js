'use strict'

const request = require('supertest')
const app = require('../app')
const gitlabMock = require('./gitlab/helper/mockServer')
const githubMock = require('./github/helper/mockServer')

describe('# API Routes with gitlab mock server', () => {
  before('Starts the mock server', () => {
    gitlabMock.listen(3000, 'gitlab.mock')
  })
  const baseURL = 'gitlab.mock:3000'
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
  it('# GET Commits', (done) => {
    request(app)
    .get(`/api/projects/140/commits?baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
})
describe('# API Routes with github mock server', () => {
  before('Starts the mock server', () => {
    githubMock.listen(3001, 'github.mock')
  })
  const baseURL = 'github.mock:3001'
  const token = 'token'
  it('# GET UserName', (done) => {
    request(app)
    .get(`/api/userName?baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })
  it('# GET Repos', (done) => {
    request(app)
    .get(`/api/projects?baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })
  it('# GET Tags', (done) => {
    request(app)
    .get(`/api/projects/octocat/Hola-mundo/tags?baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET Pulls since a date', (done) => {
    const testDate = new Date('2016-06-25')
    request(app)
    .get(`/api/projects/octocat/Hola-mundo/merges?since=${testDate}&baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET Commits from a merge request', (done) => {
    request(app)
    .get(`/api/projects/octocat/Hola-mundo/merges/1347/commits?baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('# GET Commits', (done) => {
    request(app)
    .get(`/api/projects/octocat/Hola-mundo/commits?baseURL=${baseURL}&token=${token}`)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
})
