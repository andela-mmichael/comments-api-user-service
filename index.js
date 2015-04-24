var usermodel = require('./app/users/models/user.model');
var Router = require('./app/users/routes/user.route');
var express = require('express');
var app = express();
var expressJwt = require('express-jwt');

//configure body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//connect to database
var config = require('./config/db.config');

//route middleware
app.use('/user', Router);
// app.use(expressJwt({secret: config.secret}).unless({path: ['/signup', '/login']}));

app.listen(config.port, function(){
  console.log('App working at port: ' + config.port);
});

module.exports = app;