'use strict'

const express = require('express')
const app = express()

const projects = require('./mockData/projects.json')
const commits = require('./mockData/commits140.json')
const tags = require('./mockData/tags140.json')
const mergeRequests = require('./mockData/mergeRequests140.json')

app.get('/api/v3/projects', (req, res) => {
  res.send(projects)
})

app.get('/api/v3/projects/140/repository/commits', (req, res) => {
  res.send(commits)
})

app.get('/api/v3/projects/140/repository/tags', (req, res) => {
  res.send(tags)
})

app.get('/api/v3/projects/140/merge_requests', (req, res) => {
  res.send(mergeRequests)
})

app.listen(2000)

module.exports = app
