'use strict'

const express = require('express')
const path = require('path')
const healthRoute = require('./routes/_health')
const indexRoute = require('./routes/index')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.use(express.static('releases'))
app.use('/', healthRoute)
app.use('/', indexRoute)
