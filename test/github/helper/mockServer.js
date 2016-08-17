'use strict'

const express = require('express')
const app = express()

const repos = require('./mockData/repos.json')
const commits = require('./mockData/commitsHola-mundo.json')
const tags = require('./mockData/releasesHola-mundo.json')
const pulls = require('./mockData/pullsHola-mundo.json')
const user = require('./mockData/user.json')

app.get('/user/repos', (req, res) => {
  res.send(repos)
})

app.get('/repos/octocat/Hola-mundo/commits', (req, res) => {
  res.send(commits)
})

app.get('/repos/octocat/Hola-mundo/releases', (req, res) => {
  res.send(tags)
})

app.get('/repos/octocat/Hola-mundo/pulls/1347/commits', (req, res) => {
  res.send(commits)
})

app.get('/repos/octocat/Hola-mundo/pulls', (req, res) => {
  res.send(pulls)
})

app.get('/user', (req, res) => {
  res.send(user)
})

module.exports = app
