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

  xdescribe('Route Test for /signup', function(){
    beforeEach(function(done){
      testUser = User.forge({
        username: 'user11',
        email: 'user11@user.com',
        password: 1111
        // auth: 'testoken'
      });
      done();
    });

    //check that username is provided
    it('should not create a new user without a username', function(done){
      testUser.set({username: null});
      request(app)
        .post('/signup')
        .send(testUser)
        .expect(400)
        .end(function(err, res){
          if(err) return done(err);
          expect(res.body.data).toEqual(jasmine.objectContaining({
            data: 'Incorrect Information'
          }));
          done();
        });
    });

    //check that password is provided
    it('should not create a new user without a password', function(done){
      testUser.set({password: null});
      request(app)
        .post('/signup')
        .send(testUser)
        .expect(400)
        .end(function(err, res){
          if(err) return done(err);
          expect(res.body.data).toEqual(jasmine.objectContaining({
            data: 'Wrong Information'
          }));
          done();
        });
    });

    //check that email is provided
    it('should not create a new user without an email', function(done){
      testUser.set({email: null});
      request(app)
        .post('/signup')
        .send(testUser)
        .expect(400)
        .end(function(err, res){
          if(err) {
            return done(err);
          }
          expect(res.body.data).toEqual(jasmine.objectContaining({
            data: 'Wrong Information'
          }));
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
          expect(res.body).toBeDefined();
          done();
        });
    });
  });

  describe('Route Test for /login', function(){
    beforeEach(function(done){
      testUser = User.forge(
      {
        username: 'user22',
        email: 'user22@user.com',
        password: '2222',
        auth: 'usertoken'
      });
      done();
    });

    //check that username is provided
    it('should not authenticate if no username is provided', function(done){
      testUser.set({username: null});
      request(app)
        .post('/signup')
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
        .post('/signup')
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

    afterEach(function(done){
      knex('users')
        .where('username', 'user22')
        .del()
        .then(function(){
          done();
        });
    });

  });

});