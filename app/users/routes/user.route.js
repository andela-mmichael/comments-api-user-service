var Controller = require('../controllers/user.controller');
var express = require('express');
var Router = express.Router();

Router
  .get('/', Controller.getAllUsers)

  .post('/', Controller.createUser)

  .get('/:username', Controller.getAUser)

  .put('/:username', Controller.updateUser)

  .delete('/:username', Controller.removeUser);

module.exports = Router;