'use strict'

const express = require('express')
const app = express()

const projects = require('./mockData/projects.json')
const commits = require('./mockData/commits140.json')

app.post('/api/v3/projects', (req, res) => {
  res.send(projects)
})

app.post('/api/v3/projects/140/repository/commits', (req, res) => {
  res.send(commits)
})

app.listen(2000)

module.exports = app
