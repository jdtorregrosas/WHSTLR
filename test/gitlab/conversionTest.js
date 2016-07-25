'use strict'

const mock = require('./mockServer.js')
const converter = require('../../app/gitlab/gitlabConvert.js')
const projectsSchema = require('../../app/schemas/projectsSchema.js')
const commitsSchema = require('../../app/schemas/commitsSchema.js')
const tagsSchema = require('../../app/schemas/tagsSchema.js')
const mergeRequestsSchema = require('../../app/schemas/mergeRequestsSchema.js')
const request = require('supertest')

describe('#convertProjects', () => {
  it('should output a datastructure as specified in the schema', () => {
    const input = [
      {name: 'My Project', id: 15},
      {name: 'Project 2', otherProperty: true, someFooArray: [1, 2], id: 99}
    ]
    const result = converter.convertProjects(input)
    projectsSchema.validateProjects(result)
  })

  it('should sort the projects in alphabetic order', () => {
    const input = [
      {}
    ]
    const result = converter.convertProjects(input)
    projectsSchema.validateProjects(result)
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
