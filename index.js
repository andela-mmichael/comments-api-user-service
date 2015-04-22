var usermodel = require('./app/users/models/user.model');
var express = require('express');
var Router = require('./app/users/routes/user.route');
var app = express();

//configure body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//connect to database
var config = require('./config/db.config');

//route middleware
app.use('/', Router)

app.listen(config.port, function(){
  console.log('App working at port: ' + config.port);
});

module.exports = app;