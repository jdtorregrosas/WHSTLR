'use strict'

const path = require('path')
const healthRoute = require('./routes/_health')
const indexRoute = require('./routes/index')
const aboutRoute = require('./routes/about')
const notFoundRoute = require('./routes/notFound')
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.get('/test', (req, res) => {
  res.render('index')
})

if (process.env.NODE_ENV == 'production') {
    app.listen(80)
} else {
    app.listen(5000, function () {
      console.log('WHSTLR running on port 5000!')
    })
}

app.use('/releases', express.static(path.join(__dirname, '/releases')))
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/', healthRoute)
app.use('/', indexRoute)
app.use('/', aboutRoute)
app.use('/', notFoundRoute)
