'use strict'

const express = require('express')
const app = express()

/* GET README. */
app.get('/about', (req, res) => {
  res.render('about')
})

module.exports = app
