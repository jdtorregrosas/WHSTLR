'use strict'

const express = require('express')
const app = express()
app.get('/', (req, res) => {
  if (true) {
    res.render('index')
  } else {
    res.redirect('/config')
  }
})

app.get('/config', (req, res) => {
  res.render('config')
})

app.get('/about/', (req, res) => {
  res.render('about')
})

app.get('/api', (req, res) => {
  res.redirect(301, '/public/api/index.html')
})
app.get('*', (req, res) => {
  res.status(404)
  res.render('notFound')
})

module.exports = app
