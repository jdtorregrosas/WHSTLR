'use strict'

const mock = require('./mockServer.js')
const converter = require('../../app/gitlab/gitlabConvert.js')
const projectsSchema = require('../../app/schemas/projectsSchema.js')
const tagsSchema = require('../../app/schemas/tagsSchema.js')
const mergeRequestsSchema = require('../../app/schemas/mergeRequestsSchema.js')
const request = require('supertest')

describe('# Projects', () => {
  it('should output a datastructure as specified in the schema', (done) => {
    request(mock)
    .get('/api/v3/projects')
    .end((err, res) => {
      if (err) done(err)
      else {
        const projects = converter.convertProjects(res.body)
        projectsSchema.validateProjects(projects)
        done()
      }
    })
  })
})

describe('# Merge Requests', () => {
  it('should output a datastructure as specified in the schema', (done) => {
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
})

describe('# Tags', () => {
  it('should output a datastructure as specified in the schema', (done) => {
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
})
