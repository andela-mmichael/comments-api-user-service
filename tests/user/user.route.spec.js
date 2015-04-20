var User = require('../../app/users/models/user.model')[0];
var Users = require('../../app/users/models/user.model')[1];

//connect to database
var config = require('../../config/db.config');
var knex = require('knex')(config.db[process.env.NODE_ENV]);

var request = require('supertest');
var express = require('express');
var app = express();

//configure jsonwebtoken
// var jwt = require('jsonwebtoken');
// var secret = config.secret;

var testUser;

describe('End to End Test for User Routes', function(){

  xdescribe('Route Test for POST /signup - ', function(){
    beforeEach(function(done){
      testUser = User.forge({
        username: 'user11',
        email: 'user11@user.com',
        password: 1111
      });
      done();
    });

    //check that username is provided
    it('should not create new user without a username', function(done){
      testUser.set({username: null});
      request(app)
        .post('/signup')
        .send(testUser)
        .expect(400)
        .end(function(err, res){
          if(err) {
            return done(err);
          }
          expect(res.body).toEqual(jasmine.objectContaining({
            message: 'Username is required'
          }));
          done();
        });
    });

    //check that password is provided
    it('should not create new user without a password', function(done){
      testUser.set({password: null});
      request(app)
        .post('/signup')
        .send(testUser)
        .expect(400)
        .end(function(err, res){
          if(err) {
            return done(err);
          }
          expect(res.body).toEqual(jasmine.objectContaining({
            message: 'Password is required'
          }));
          done();
        });
    });

    //check that email is provided
    it('should not create new user without an email', function(done){
      testUser.set({email: null});
      request(app)
        .post('/signup')
        .send(testUser)
        .expect(400)
        .end(function(err, res){
          if(err) {
            return done(err);
          }
          expect(res.body).toEqual(jasmine.objectContaining({
            message: 'Email is required'
          }));
          done();
        });
    });

    //check that username is unique
    it('should not create new user if user already exist', function(done){
      testUser.save().then(function(){});
      request(app)
        .post('/signup')
        .send({username: 'user11', email: 'user11@user.com', password: 1111})
        .expect(409)
        .end(function(err){
          expect(err).not.toBeDefined();
          done();
        });
      
    });

    //check that a new user is created
    it('should add a new user', function(done){
      request(app)
        .post('/signup')
        .send(testUser)
        .expect(200)
        .end(function(err, res){
          if(err){
            return done(err);
          }
          expect(res.body).toEqual(jasmine.objectContaining({
            username: 'user11',
            email: 'user11@user.com',
            password: 1111
          }));
          done();
        });
    });

    afterEach(function(done){
      knex('users')
        .where('username', 'user11')
        .del()
        .then(function(){
          done();
        });
    });
  });

  xdescribe('Route Test for POST /login - ', function(){
    beforeEach(function(done){
      testUser = User.forge(
      {
        username: 'user22',
        email: 'user22@user.com',
        password: '2222'
      });
      done();
    });

    //check that username is provided
    it('should not authenticate if no username is provided', function(done){
      testUser.set({username: null});
      request(app)
        .post('/login')
        .send(testUser)
        .expect(401)
        .end(function(err, res){
          if(err){
            return done(err);
          }
          expect(res.body).toBeDefined();
        done();
      });
    });

    //check that password is provided
    it('should not authenticate if no password is provided', function(done){
      testUser.set({password: null});
      request(app)
        .post('/login')
        .send(testUser)
        .expect(401)
        .end(function(err, res){
          if(err){
            return done(err);
          }
          expect(res.body).toBeDefined();
        done();
      });
    });

    //check that user data is returned with a token
    it('should authenticate and return user data and a token', function(done){
      request(app)
        .post('/login')
        .send(testUser)
        .expect(200)
        .end(function(err, res){
          expect(res.body).toEqual(jasmine.objectContaining({
            username: 'user22',
            email: 'user22@user.com',
            password: '2222',
            auth: 'testoken'
          }));
          done();
        });
    });

    afterEach(function(done){
      knex('users')
        .where('username', 'user22')
        .del()
        .then(function(){
          done();
        });
    });
  });

  describe('GET /users', function(){
    beforeEach(function(done){
      Users
        .forge([{
          username: 'user33',
          email: 'user33@user.com',
          password: '3333',
          last_name: 'damon',
          first_name: 'dallas',
          auth: 'token33'
        },
        {
          username: 'user44',
          email: 'user44@user.com',
          password: '4444',
          last_name: 'stefan',
          first_name: 'dallas',
          auth: 'token44'
        }])
        .invokeThen('save')
        .then(function(users){
          done();
        });
    });

    it('should throw an exception if the user is not authenticated', function(done){
      request(app)
        .get('/users')
        .expect(401)
        .end(function(err, res){
          expect(response.body).toEqual(jasmine.objectContaining({
            message: 'Unauthorized!!!'
          }));
          done();
        });
    });

    afterEach(function (done) {
      knex('users')
        .where('username', 'user33')
        .orWhere('username', 'user44')
        .del()
        .then(function() {
          done();
        });
    });

  });

});