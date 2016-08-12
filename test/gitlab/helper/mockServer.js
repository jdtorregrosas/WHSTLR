'use strict'

const express = require('express')
const app = express()

const projects = require('./mockData/projects.json')
const commits = require('./mockData/commits140.json')
const tags = require('./mockData/tags140.json')
const mergeRequests = require('./mockData/mergeRequests140.json')
const user = require('./mockData/user.json')

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

app.get('/api/v3/projects/140/merge_requests/1456/commits', (req, res) => {
  res.send(commits)
})

app.get('/api/v3/projects/140/merge_requests/1436/commits', (req, res) => {
  res.send(commits)
})
app.get('/api/v3/projects/140/merge_requests/1404/commits', (req, res) => {
  res.send(commits)
})
app.get('/api/v3/projects/140/merge_requests/1401/commits', (req, res) => {
  res.send(commits)
})

app.get('/api/v3/user', (req, res) => {
  res.send(user)
})

module.exports = app
