'use strict'

const express = require('express')
const app = express()
const execute = require('../execute').execute
// const md = require('node-markdown').Markdown
const branch = 'master'
const mock = require('../test/APIMock.js')
let successMessage
// let error
/* GET Index. */
app.get('/index', (req, res) => {
  res.render('index', {
    user: mock.getUser(),
    projects: mock.getProjects(),
    tags: mock.getTags(),
    commits: mock.getCommits(),
    mergeRequests: mock.getMergeRequests(),
    error: mock.getError(),
    successMessage: successMessage
  })
  successMessage = ''
  // error = ''
})

app.post('/createNotes', (req, res) => {
  const repositoryURL = req.body.repository
  const version = req.body.newVersion
  const logOptions = {
    endTag: req.body.endVersion
  }
  execute(repositoryURL, version, branch, logOptions)
  .then((file) => {
    successMessage = 'releases/' + file
    // error = ''
    res.redirect('/index')
  }).catch((err) => {
    // error = err
    successMessage = err
    res.redirect('/index')
  })
})

module.exports = app
