'use strict'

const express = require('express')
const app = express()

app.get('/_health', (req, res) => {
  res.status(200).send({status: 200})
})

module.exports = app
