var User = require('../models/user.model')[0];
var jwt = require('jsonwebtoken');
var config = require('../../../config/db.config');
var knex = require('knex')(config.db[process.env.NODE_ENV]);
var secret = config.secret;
var express = require('express');
var Router = express.Router();
var Crypto = require('crypto');

var encrypt = function(password, salt){
  // create hash
  // var hash = Crypto.createHash('sha512');
  var hash = Crypto.createHmac('sha512', secret);
      hash.update(password);
      hash.update(salt);
  return hash.digest('base64');
};

module.exports = {
  signUp: function(req, res){
    if(!(req.body.username && req.body.password && req.body.email)){
      return res.status(400).json({message: "Username, Password & Email fields are required"});
    }
    User.forge({
      username: req.body.username,
      email: req.body.email
    })
    .fetch()
    .then(function (user){
      if(user){
        return res.status(400).json({message: "User already exist!"});
      }
      else{
        var enc_password = encrypt(req.body.password, req.body.username);
        User.forge(
        {
          username: req.body.username,
          password: enc_password,
          email: req.body.email
        })
        .save()
        .then(function (err, user1){
          res.json({message: "User successfully created!", data: user1});
        });
      }
    })
    .catch(function(err){
      res.status(500).json({ Error: 'An error occurred' + err});
    });
  },

  login: function(req, res){
    if(!(req.body.username && req.body.password)){
      return res.status(400).json({message: "Username & Password are required"});
    }
    User
      .forge({
        username: req.body.username
      })
      .fetch()
      .then(function (user){
        if(user){
          var token = jwt.sign(user, secret);
          res.status(200).json({message: "Login successful!", authToken: token});
        }
        else{
          res.status(400).json({message: "Invalid Username/Password"});
        }
    })
    .catch(function(err){
      res.status(500).json(err);
    });
  },

  getAllUsers: function(req, res){
    User
      .fetchAll({require: true})
      .then(function (users) {
        res.status(200).json(users);
      })
      .catch(function(err){
        res.status(401).json({Error: "No users found"});
      });
  },

  getUser: function(req, res){
    new User(
    {
      username: req.params.username
    })
    .fetch()
    .then(function (user){
      if(user){
        res.status(200).json(user);
      }
      else{
        res.status(404).json({Error: "No user found"});
      }
    })
    .catch(function (err){
      res.json({Error: "No user found"});
    });
  },

  updateUser: function(req, res){
    new User(
    {
     username: req.params.username 
    })
    .fetch({require: true})
    .then(function (user){
      if(user){
        // if(req.body.password){
        //   var enc_password = encrypt(req.body.password, req.body.username);
        // }
        user
          .save({
            username: req.body.username
            // password: enc_password
          }, {patch: true})
          .then(function (user1){
            res.status(200).json({message: "Update successful", data: user1});
          });
      }
      else{
        res.json({message: "Update Unsuccessful"});
      }
    })
    .catch(function (err){
      res.json({Error: "User does not exist"});
    });
  },

  removeUser: function(req, res){
    new User({
      username: req.params.username
    })
    .fetch({require: true})
    .then(function (user){
      knex('users')
        .where('username', req.params.username)
        .del()
        .then(function(){
          res.status(200).json({message: "User deleted!"});
        });
    })
    .catch(function (err){
      res.json({Error: "User does not exist"});
    });
  },

  // verifyToken: function(err, req, res, next){
  //   if (err.name === 'UnauthorizedError') {
  //     res.status(401).json({Error: "Invalid"});
  //   }
  //   var decode = jwt.verify(req, secret);
  //   console.log(decode);
  //   res.json(decode);
  // }
  
};






