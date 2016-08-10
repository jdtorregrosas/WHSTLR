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

app.get('*', (req, res) => {
  res.status(404)
  res.render('notFound')
})

module.exports = app
