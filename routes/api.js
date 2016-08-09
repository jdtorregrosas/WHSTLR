'use strict'

const express = require('express')
const app = express()
const GitlabClient = require('../app/gitlab/GitlabClient')
const converter = require('../app/gitlab/gitlabConvert')
const ErrorW = require('../app/ErrorW')
const store = require('./store')
let commits
let mergeRequests

app.get('/projects', (req, res) => {
  const baseURL = store.config.baseURL
  const token = store.config.token
  const gitlabClient = new GitlabClient(baseURL, token)
  gitlabClient.getProjects().then((res) => {
    store.projects = converter.convertProjects(res)
  }).then(() => {
    res.send(store.projects)
  }).catch((err) => {
    res.status(500).send(err)
  })
})
app.get('/projects/:projectId', (req, res) => {
  const projects = store.projects
  let projectResponse
  for (let project in projects) {
    if (String(projects[project].id) === req.params.projectId) {
      projectResponse = projects[project]
    }
  }
  if (projectResponse) res.send(projectResponse)
  else res.sendStatus(404)
  // res.send(404)
})

app.get('/projects/:projectId/tags', (req, res) => {
  const baseURL = store.config.baseURL
  const token = store.config.token
  const gitlabClient = new GitlabClient(baseURL, token)
  let tags
  gitlabClient.getTags(req.params.projectId)
  .then((tagsRaw) => {
    tags = converter.convertTags(tagsRaw)
    res.send(tags)
  }).catch((err) => {
    res
    .status(500)
    .send(new ErrorW(err))
  })
})
app.get('/projects/:projectId/tags/:name', (req, res) => {
  const baseURL = store.config.baseURL
  const token = store.config.token
  const gitlabClient = new GitlabClient(baseURL, token)
  let tags
  gitlabClient.getTags(req.params.projectId)
  .then((tagsRaw) => {
    let tagResponse
    tags = converter.convertTags(tagsRaw)
    for (let tag in tags) {
      if (tags[tag].name === req.params.name) {
        tagResponse = tags[tag]
      }
    }
    if (tagResponse) res.send(tagResponse)
    else res.sendStatus(404)
  }).catch((err) => {
    res
    .status(500)
    .send(new ErrorW(err))
  })
})
// Requesting merges by date /projects/:projectId/getMerges?since=
app.get('/projects/:projectId/merges', (req, res) => {
  const baseURL = store.config.baseURL
  const token = store.config.token
  const gitlabClient = new GitlabClient(baseURL, token)
  let date = (req.query.since) ? new Date(req.query.since) : new Date('1991-05-25')
  if (date) {
    gitlabClient.getMergeRequests(req.params.projectId)
    .then((mergesRaw) => {
      mergeRequests = converter.convertMergeRequests(mergesRaw, date)
    }).then(() => {
      res.send(mergeRequests)
    }).catch((err) => {
      res
      .status(500)
      .send(new ErrorW(err))
    })
  } else {
    res.sendStatus(403)
  }
})
app.get('/projects/:projectId/merges/:mergeId', (req, res) => {
  const baseURL = store.config.baseURL
  const token = store.config.token
  const gitlabClient = new GitlabClient(baseURL, token)
  gitlabClient.getMergeRequests(req.params.projectId)
  .then((mergesRaw) => {
    mergeRequests = converter.convertMergeRequests(mergesRaw)
    let mergeResponse
    for (let merge in mergeRequests) {
      if (String(mergeRequests[merge].id) === req.params.mergeId) {
        mergeResponse = mergeRequests[merge]
      }
    }
    if (mergeResponse) res.send(mergeResponse)
    else res.sendStatus(404)
  }).catch((err) => {
    res
    .status(500)
    .send(new ErrorW(err))
  })
})
app.get('/projects/:projectId/merges/:mergeid/commits', (req, res) => {
  const baseURL = store.config.baseURL
  const token = store.config.token
  const gitlabClient = new GitlabClient(baseURL, token)
  gitlabClient.getCommitsFromMerge(req.params.projectId, req.params.mergeid)
  .then((commitsRaw) => {
    commits = converter.convertCommits(commitsRaw)
  }).then(() => {
    res.send(commits)
  }).catch((err) => {
    res
    .status(500)
    .send(new ErrorW(err))
  })
})

module.exports = app
