'use strict'

const express = require('express')
const app = express()
const GitlabClient = require('../app/gitlab/GitlabClient')
const converter = require('../app/converter')
// const mock = require('../test/APIMock.js')
// const execute = require('../execute').execute
// const md = require('node-markdown').Markdown
// const branch = 'master'
let successMessage
let user, projects
let commits
let mergeRequests
let tags
let error
// let error
let gitlabClient

app.get('/', (req, res) => {
  res.redirect('/config')
})

app.get('/config', (req, res) => {
  res.render('config', {})
})

app.get('/index', (req, res) => {
  if (projects) {
    res.render('index', {
      user: user,
      projects: projects,
      commits: commits,
      mergeRequests: mergeRequests,
      error: error,
      successMessage: successMessage
    })
  } else {
    res.redirect('/config')
  }
  // error = ''
})

app.post('/applyConfig', (req, res) => {
  let token = req.body.token
  let baseURL = req.body.baseURL
  gitlabClient = new GitlabClient(baseURL, token)
  user = gitlabClient.getCurrentUser().then((user) => {
    gitlabClient.getProjects().then((res) => {
      projects = converter.convertProjects(res)
    }).then(() => {
      res.redirect('/index')
    }).catch((err) => {
      error = {title: 'Error', description: err}
    })
  })
})

app.post('/getTags', (req, res) => {
  for (let project in projects) {
    if (projects[project].name === req.body.project) {
      gitlabClient.getTags(projects[project].id)
      .then((res) => {
        tags = converter.convertTags(res.body)
      }).then(() => {
        res.send(tags)
      }).catch((err) => {
        error = {title: 'Error', description: err}
      })
    }
  }
})

app.post('/createNotes', (req, res) => {
  commits = []
  mergeRequests = []
  console.log(tags)
  for (let project in projects) {
    if (projects[project].name === req.body.projects) {
      gitlabClient.getCommits(projects[project].id)
      .then((res) => {
        commits = converter.convertCommits(res)
      }).then(() => {
        gitlabClient.getMergeRequests(projects[project].id).then((result) => {
          mergeRequests = converter.convertMergeRequests(result)
        }).then(() => {
          res.redirect('/index')
        }).catch((err) => {
          error = {title: 'Error', description: err}
          commits = []
          mergeRequests = []
          res.redirect('/index')
        })
      }).catch((err) => {
        error = {title: 'Error', description: err}
        commits = []
        mergeRequests = []
        res.redirect('/index')
      })
    }
  }
})

module.exports = app
