'use strict'

const expect = require('chai').expect
const GitlabClient = require('../app/gitlab/GitlabClient')
let gitlabClient

before('Create a GitlabClient for the tests', () => {
  gitlabClient = new GitlabClient('http://gitlab.local.coliquio.de', 'aqYv_Y-WCMWPQGS7A9rY')
})

describe('# Projects', () => {
  it('Should get an array of projects', () => {
    return gitlabClient.getProjects()
    .then((res) => {
      expect(res).to.be.an('array')
    })
  })
})

describe('# Commits', () => {
  it('Should get an array of commits of an specific project', () => {
    const projectId = 140
    return gitlabClient.getCommits(projectId)
    .then((res) => {
      expect(res).to.be.an('array')
    })
  })
})

describe('# Merge Requests', () => {
  it('Should get an array of merge requests of an specific project', () => {
    const projectId = 140
    return gitlabClient.getMergeRequests(projectId)
    .then((res) => {
      expect(res).to.be.an('array')
    })
  })
})

describe('# Current user', () => {
  it('Should get an user object', () => {
    return gitlabClient.getCurrentUser()
    .then((res) => {
      expect(res).to.be.an('object')
      expect(res.name).to.exist
      expect(res.username).to.exist
    })
  })
})
