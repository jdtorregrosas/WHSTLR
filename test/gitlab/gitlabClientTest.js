'use strict'

const GitlabClient = require('../../app/gitlab/GitlabClient')
const mockCommitsFromMerge = require('./helper/mockData/commits140WithMergeid.json')
const mockCommits = require('./helper/mockData/commits140.json')
const mockProjects = require('./helper/mockData/projects.json')
const mockTags = require('./helper/mockData/tags140.json')
const mockMerges = require('./helper/mockData/mergeRequests140.json')
const mockUser = require('./helper/mockData/user.json')
const assert = require('assert')

describe('Gitlab Client Tests', () => {
  let mockServer
  let gitlabClient
  let gitlabClientInvalid

  beforeEach(function () {
    let app = require('./helper/mockServer.js')
    mockServer = app.listen(2001)
    gitlabClient = new GitlabClient('localhost:2001', '')
    gitlabClientInvalid = new GitlabClient('thats.an.invalid.host', '')
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
  it('Should reject getTags when an incorrect server is set', (done) => {
    gitlabClientInvalid.getTags(140).then((tags) => {
      done(new Error('Cannot send Tags with an invalid server'))
    }).catch((err) => {
      if (err) done()
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
  it('Should reject getProjects when an incorrect server is set', (done) => {
    gitlabClientInvalid.getProjects(140).then((tags) => {
      done(new Error('Cannot send Projects with an invalid server'))
    }).catch((err) => {
      if (err) done()
    })
  })
  it('Should get Commits from Merge correctly', (done) => {
    gitlabClient.getCommitsFromMerge(140, 1456).then((commits) => {
      assert.deepEqual(mockCommitsFromMerge, commits)
      done()
    }).catch((err) => {
      done(err)
    })
  })
  it('Should reject getCommitsFromMerge when an incorrect server is set', (done) => {
    gitlabClientInvalid.getCommitsFromMerge(140, 1456).then((tags) => {
      done(new Error('Cannot send commits with an invalid server'))
    }).catch((err) => {
      if (err) done()
    })
  })
  it('Should get Commits correctly', (done) => {
    gitlabClient.getCommits(140).then((commits) => {
      assert.deepEqual(mockCommits, commits)
      done()
    }).catch((err) => {
      done(err)
    })
  })
  it('Should reject getCommitsFromMerge when an incorrect server is set', (done) => {
    gitlabClientInvalid.getCommits(140).then((tags) => {
      done(new Error('Cannot send commits with an invalid server'))
    }).catch((err) => {
      if (err) done()
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
  it('Should reject getMergeRequests when an incorrect server is set', (done) => {
    gitlabClientInvalid.getMergeRequests(140).then((tags) => {
      done(new Error('Cannot send Merges with an invalid server'))
    }).catch((err) => {
      if (err) done()
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
  it('Should reject getCurrentUser when an incorrect server is set', (done) => {
    gitlabClientInvalid.getCurrentUser().then((tags) => {
      done(new Error('Cannot send User with an invalid server'))
    }).catch((err) => {
      if (err) done()
    })
  })
})
