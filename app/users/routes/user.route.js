var Controller = require('../controllers/user.controller');
var express = require('express');
var Router = express.Router();

Router
  //  /users routes
  .get('/users', Controller.getAllUsers)

  .post('/users/signup', Controller.signUp)

  .post('/users/login', Controller.login)

  // /users/username routes
  .get('/users/:username', Controller.getUser)

  .put('/users/:username', Controller.updateUser);

  // .delete('/users/:username', Controller.removeUser);

module.exports = Router;