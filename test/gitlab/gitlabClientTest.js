'use strict'

const GitlabClient = require('../../app/gitlab/GitlabClient')
const mockCommits = require('./mockData/commits140WithMergeid.json')
const mockProjects = require('./mockData/projects.json')
const mockTags = require('./mockData/tags140.json')
const mockMerges = require('./mockData/mergeRequests140.json')
const mockUser = require('./mockData/user.json')
const assert = require('assert')

describe('Gitlab Client Tests', () => {
  let mockServer
  let gitlabClient

  beforeEach(function () {
    let app = require('./mockServer.js')
    mockServer = app.listen(2001)
    gitlabClient = new GitlabClient('localhost:2001', '')
  })
  afterEach(function () {
    mockServer.close()
  })
  it('Should get Tags correctly', (done) => {
    gitlabClient.getTags(140).then((tags) => {
      assert.deepEqual(mockTags, tags)
      done()
    }).catch((err) => {
      done(err)
    })
  })
  it('Should get Projects correctly', (done) => {
    gitlabClient.getProjects().then((projects) => {
      assert.deepEqual(mockProjects, projects)
      done()
    }).catch((err) => {
      done(err)
    })
  })
  it('Should get Commits from Merge correctly', (done) => {
    gitlabClient.getCommitsFromMerge(140, 1456).then((commits) => {
      assert.deepEqual(mockCommits, commits)
      done()
    }).catch((err) => {
      done(err)
    })
  })
  it('Should get mergeRequests correctly', (done) => {
    gitlabClient.getMergeRequests(140).then((merges) => {
      assert.deepEqual(mockMerges, merges)
      done()
    }).catch((err) => {
      done(err)
    })
  })
  it('Should get currentUser correctly', (done) => {
    gitlabClient.getCurrentUser().then((user) => {
      assert.deepEqual(mockUser, user)
      done()
    }).catch((err) => {
      done(err)
    })
  })
})
