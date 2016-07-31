'use strict'

const express = require('express')
const app = express()
const GitlabClient = require('../app/gitlab/GitlabClient')
const converter = require('../app/gitlab/gitlabConvert')
let user, projects
let commits
let mergeRequests
let tags
let error
let gitlabClient
let currentTag
let currentProject

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
      currentTag: currentTag,
      currentProject: currentProject
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
      console.log(error)
    })
  }).catch((err) => {
    error = {title: 'Error', description: err}
    console.log(error)
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
  let tagDate
  let tagDateConverted = '2007-09-06T04:00:00'
  currentTag = req.body.tags
  currentProject = req.body.projects
  for (let project in projects) {
    if (projects[project].name === req.body.projects) {
      for (let tag in tags) {
        if (tags[tag].name === req.body.tags) {
          tagDate = tags[tag].date
        }
      }
      if (tagDate !== undefined) {
        tagDateConverted = converter.convertDate(tagDate)
      }
      gitlabClient.getMergeRequests(projects[project].id).then((result) => {
        mergeRequests = converter.convertMergeRequests(result, tagDateConverted)
      }).then(() => {
        for (let mergeRequest in mergeRequests) {
          gitlabClient.getCommitsFromMerge(projects[project].id, mergeRequests[mergeRequest].id).then((result) => {
            mergeRequests[mergeRequest].commits= converter.convertCommits(result)
            res.redirect('/index')
          }).catch((err) => {
            error = {title: 'Error', description: err}
            commits = []
            mergeRequests = []
            console.log(err)
            res.redirect('/index')
          })
        }
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
