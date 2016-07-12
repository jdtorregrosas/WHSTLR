'use strict'

const mock = require('./mockServer.js')
const converter = require('../../app/converter.js')
const projectsSchema = require('../../app/schemas/projectsSchema.js')
const commitsSchema = require('../../app/schemas/commitsSchema.js')
const tagsSchema = require('../../app/schemas/tagsSchema.js')
const mergeRequestsSchema = require('../../app/schemas/mergeRequestsSchema.js')
const request = require('supertest')

it('# Projects', (done) => {
  request(mock)
  .get('/api/v3/projects')
  .end((err, res) => {
    if (err) done(err)
    else {
      const projects = converter.convertProjects(res.body, [])
      projectsSchema.validateProjects(projects)
      done()
    }
  })
})

it('# Commits', (done) => {
  request(mock)
  .get('/api/v3/projects/140/repository/commits')
  .end((err, res) => {
    if (err) done(err)
    else {
      const commits = converter.convertCommits(res.body)
      commitsSchema.validateCommits(commits)
      done()
    }
  })
})
it('# Merge Requests', (done) => {
  request(mock)
  .get('/api/v3/projects/140/merge_requests')
  .end((err, res) => {
    if (err) done(err)
    else {
      const mergeRequests = converter.convertMergeRequests(res.body)
      mergeRequestsSchema.validateMergeRequests(mergeRequests)
      done()
    }
  })
})
it('# Tags', (done) => {
  request(mock)
  .get('/api/v3/projects/140/repository/tags')
  .end((err, res) => {
    if (err) done(err)
    else {
      const tags = converter.convertTags(res.body)
      tagsSchema.validateTags(tags)
      done()
    }
  })
})
