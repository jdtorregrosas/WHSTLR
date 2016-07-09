'use strict'

const express = require('express')
const app = express()

app.get('*', (req, res) => {
  res.render('notFound')
})

module.exports = app