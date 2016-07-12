'use strict'

const express = require('express')
const app = express()

const commits = require('./mockData/commits140.json')
const projects = require('./mockData/projects.json')

app.post('/api/v3/projects', (req, res) => {
  res.send(projects)
})

app.listen(2000)

module.exports = app
