'use strict'

const store = require('./store')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  if (store.projects && store.projects.length > 0) {
    res.render('index', {
      projects: store.projects
    })
  } else {
    res.redirect('/config/')
  }
})

app.get('/config/', (req, res) => {
  res.render('config', {
    baseURL: store.config.baseURL,
    token: store.config.token
  })
})
app.post('/config/', (req, res) => {
  const baseURL = req.body.baseURL
  const token = req.body.token
  if (baseURL && token) {
    store.config.baseURL = req.body.baseURL
    store.config.token = req.body.token
    res.status(200).send({status: 'saved'})
  } else {
    res.send(500)
  }
})

module.exports = app
