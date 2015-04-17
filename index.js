var express = require('express');
var app = express();
var usermodel = require('./app/users/models/user.model');
var config = require('./config/db.config');

app.listen(config.port, function(){
  console.log('App working at port: ' + config.port);
});