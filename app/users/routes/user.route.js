var Controller = require('../controllers/user.controller');
var express = require('express');
var Router = express.Router();

Router
  //  /users routes
  .get('/', Controller.getAllUsers)

  .post('/signup', Controller.signUp)

  .post('/login', Controller.login)

  // /username routes
  .get('/:username', Controller.getUser)

  .put('/:username', Controller.updateUser)

  .delete('/:username', Controller.removeUser);

  // .post('/authenticate', Controller.verifyToken);

module.exports = Router;
