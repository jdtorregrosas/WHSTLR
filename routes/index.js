'use strict'

const express = require('express')
const app = express()
const execute = require('../execute').execute
// const md = require('node-markdown').Markdown
const branch = 'master'
const mock = require('../test/APIMock.js')
let successMessage
let user, projects
let tags
let commits
let mergeRequests
let error
// let error

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
      tags: tags,
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
  user = mock.getUser()
  projects = mock.getProjects()
  tags = mock.getTags()
  res.redirect('index')
})

app.post('/createNotes', (req, res) => {
  const repositoryURL = req.body.repository
  const version = req.body.newVersion
  const logOptions = {
    endTag: req.body.endVersion
  }
  commits = mock.getCommits()
  mergeRequests = mock.getMergeRequests()
  error = mock.getError()
  res.redirect('/index')
})

module.exports = app
