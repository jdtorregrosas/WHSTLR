'use strict'

const express = require('express')
const app = express()
const GitlabClient = require('../app/gitlab/GitlabClient')
const converter = require('../app/gitlab/gitlabConvert')
const ErrorW = require('../app/ErrorW')
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
      throw new ErrorW(err)
    })
  }).catch((err) => {
    throw new ErrorW(err)
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
        throw new ErrorW('Could not fetch Tags')
      })
    }
  }
})
app.post('/getMerges', (req, res) => {
  let tagDate
  let tagDateConverted = '2007-09-06T04:00:00'
  let isFetched = false
  for (let project in projects) {
    if (projects[project].name === req.body.project) {
      for (let tag in tags) {
        if (tags[tag].name === req.body.tag) {
          tagDate = tags[tag].date
        }
      }
      if (tagDate !== undefined) {
        tagDateConverted = converter.convertDate(tagDate)
      }
      gitlabClient.getMergeRequests(projects[project].id)
      .then((res) => {
        mergeRequests = converter.convertMergeRequests(res, tagDateConverted)
      }).then(() => {
        res.send(mergeRequests)
      }).catch((err) => {
        throw new ErrorW(err)
      })
      isFetched = true
    } else{
      isFetched = false
    }
  }
  if(!isFetched) throw new ErrorW('Could not fetch merges: Project doesnt exist')
})
app.post('/getCommits', (req, res) => {
  let isFetched = false
  for (let project in projects) {
    if (projects[project].name === req.body.project) {
      gitlabClient.getCommitsFromMerge(projects[project].id, req.body.mergeid)
      .then((res) => {
        commits = converter.convertCommits(res)
      }).then(() => {
        res.send(commits)
      }).catch((err) => {
         throw new ErrorW('Gilab Client failed in Commits operation')
      })
      isFetched = true
    } else {
      isFetched = false
    }
  }
  if(!isFetched) throw new ErrorW('Could not fetch commits: Project doesnt exist')
})

module.exports = app
