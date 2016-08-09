'use strict'

const express = require('express')
const app = express()
const GitlabClient = require('../app/gitlab/GitlabClient')
const converter = require('../app/gitlab/gitlabConvert')
const ErrorW = require('../app/ErrorW')
const config = {
  baseURL: '',
  token: ''
}

app.get('/config', (req, res) => {
  if (config.baseURL && config.token) {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(config, null, 3))
  } else {
    res.sendStatus(404)
  }
})

app.post('/config', (req, res) => {
  const baseURL = req.body.baseURL
  const token = req.body.token
  if (baseURL && token) {
    config.baseURL = baseURL
    config.token = token
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
})

app.get('/projects', (req, res) => {
  const baseURL = config.baseURL
  const token = config.token
  const gitlabClient = new GitlabClient(baseURL, token)
  gitlabClient.getProjects().then((projetsRaw) => {
    const projects = converter.convertProjects(projetsRaw)
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(projects, null, 3))
  }).catch((err) => {
    res.status(500).send(err)
  })
})

app.get('/projects/:projectId/tags', (req, res) => {
  const baseURL = config.baseURL
  const token = config.token
  const gitlabClient = new GitlabClient(baseURL, token)
  gitlabClient.getTags(req.params.projectId)
  .then((tagsRaw) => {
    const tags = converter.convertTags(tagsRaw)
    res.send(tags)
  }).catch((err) => {
    res
    .status(500)
    .send(new ErrorW(err))
  })
})

app.get('/projects/:projectId/tags/:name', (req, res) => {
  const baseURL = config.baseURL
  const token = config.token
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
  const baseURL = config.baseURL
  const token = config.token
  const gitlabClient = new GitlabClient(baseURL, token)
  let date = (req.query.since) ? new Date(req.query.since) : new Date('1991-05-25')
  if (date) {
    gitlabClient.getMergeRequests(req.params.projectId)
    .then((mergesRaw) => {
      const mergeRequests = converter.convertMergeRequests(mergesRaw, date)
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
  const baseURL = config.baseURL
  const token = config.token
  const gitlabClient = new GitlabClient(baseURL, token)
  gitlabClient.getMergeRequests(req.params.projectId)
  .then((mergesRaw) => {
    const mergeRequests = converter.convertMergeRequests(mergesRaw)
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
  const baseURL = config.baseURL
  const token = config.token
  const gitlabClient = new GitlabClient(baseURL, token)
  gitlabClient.getCommitsFromMerge(req.params.projectId, req.params.mergeid)
  .then((commitsRaw) => {
    const commits = converter.convertCommits(commitsRaw)
    res.send(commits)
  }).catch((err) => {
    res
    .status(500)
    .send(new ErrorW(err))
  })
})

module.exports = app
