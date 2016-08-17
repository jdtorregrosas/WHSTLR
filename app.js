'use strict'

const path = require('path')
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
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

const server_port = process.env.PORT || 5000;
const server_host = '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
app.use('/releases', express.static(path.join(__dirname, '/releases')))
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/api', apiRoutes)
app.use('/', webRoutes)

module.exports = app
