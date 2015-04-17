var config = require('../../config/db.config');
var knex = require('knex')(config.db[process.env.NODE_ENV]);

var User = require('../../app/users/models/user.model')[0];
var Users = require('../../app/users/models/user.model')[1];

var testUser;

describe('Unit Test for User Model', function(){
  
  describe('Create User', function(){
    beforeEach(function(done){
      testUser = User.forge({
        first_name: 'john', 
        last_name: 'doe', 
        username: 'johndoe', 
        email: 'johnny_doe@user.com', 
        password: '1234',
        auth: '9999'
      });
      done();
    });

    //check that new user is created and saved in the database
    it('should create a new user', function(done){
      testUser
        .save()
        .then(function(user){
          expect(user.toJSON()).toEqual(jasmine.objectContaining({
            first_name: 'john', 
            last_name: 'doe', 
            username: 'johndoe', 
            email: 'johnny_doe@user.com', 
            password: '1234',
            auth: '9999'
          }));
        done();
      });
    });

    //check that username is provided
    it('should not save without a username', function(done){
      testUser.set({username: null});
      testUser
        .save()
        .then(function(){
        })
        .catch(function(err){
          console.log(err);
          expect(err).not.toBeNull();
          done();
      });
    });

    //check that username does not already exist
    it('should not save if username already exist', function(done){
      Users.forge([
        {
          first_name: 'john',
          last_name: 'doe',
          username: 'user_john',
          email: 'johndoe@user.com',
          password: '456'
        },
        {
          first_name: 'john',
          last_name: 'Douglas',
          username: 'user_john',
          email: 'john_doe@user.com',
          password: '234'
        }
        ])
        .invokeThen('save')
        .then(function(){

        })
        .catch(function(err){
          expect(err).toBeDefined();
          done();
        });
    });

    //check that email is provided
    it('should not save without an email', function(done){
      testUser.set({email: null});
      testUser
        .save()
        .then(function(){

        })
        .catch(function(err){
          expect(err).not.toBeNull();
          done();
        });
    });

    // Check that email does not already exist
    it('should not save if email is not unique', function(done){
      Users.forge([
        {
          first_name: 'john',
          last_name: 'doe',
          username: 'user1',
          email: 'johndoe@user.com',
          password: '7890'
        },
        {
          first_name: 'john',
          last_name: 'Douglas',
          username: 'user2',
          email: 'johndoe@user.com',
          password: '5678'
        }])
        .invokeThen('save')
        .then(function (users) {

        })
        .catch(function (error) {
          expect(error).toBeDefined();
          done();
        });
    });

    // Check that the new user cannot be saved without setting the password property
    it('should not save user without a password', function(done){
      testUser.set({password: null});
      testUser
        .save()
        .then(function(){
        })
        .catch(function (err) {
          expect(err).toBeDefined();
          done();
        });
    });

    // Check that the new user cannot be saved if the password already exists
    it('should not save if password already exists', function(done){
      Users.forge([
        {
          first_name: 'john',
          last_name: 'doe',
          username: 'user_john',
          email: 'john_doe@user.com',
          password: '7890'
        },
        {
          first_name: 'john',
          last_name: 'doe',
          username: 'user_johnd',
          email: 'johndoe@user.com',
          password: '7890'
        }])
        .invokeThen('save')
        .then(function(){
        })
        .catch(function (error) {
          expect(error).not.toBeNull();
          done();
        });
    });

    //check that user has token
    it('should not save without a token', function(done){
      testUser.set({auth: null});
      testUser
        .save()
        .then(function(){
        })
        .catch(function(err){
          expect(err).toBeDefined();
          done();
        });
    });

    //check that token is unique
    it('should not save if token already exist', function(done){
      Users.forge([
      {
        username: 'user44',
        auth: '1111'
      },
      {
        username: 'user77',
        auth: '1111'
      }
      ])
      .invokeThen('save')
      .then(function(){
      })
      .catch(function(err){
        expect(err).not.toBeNull();
        done();
      });
    });

    afterEach(function(done){
      knex('users')
        .where('first_name', 'john')
        .del()
        .then(function(){
          done();
      });
    });
  });

  describe('Update User', function(){
    beforeEach(function(done){
      User.forge({
        first_name: 'john',
        last_name: 'doe',
        username: 'user22',
        email: 'user22@user.com',
        password: '0101'      
      })
      .save()
      .then(function(){
        done();
      });

    });

    //check that username is updated
    it('should update the username', function(done){
      User
        .where('username', 'user22')
        .save({username: 'user33'}, {method: 'update', patch: true})
        .then(function(update){
          expect(update.toJSON()).toEqual(jasmine.objectContaining({
            username: 'user33'
          }));
          done();
        });
    });

    afterEach(function(done){
      knex('users')
        .where('email', 'user22@user.com')
        .del()
        .then(function(){
          done();
      });
    });
  });

  describe('Delete User', function(){
    beforeEach(function(done){
      User.forge({
        first_name: 'Mary',
        last_name: 'Doe',
        username: 'user19',
        email: 'usermary19@user.com',
        password: '1009'
      })
      .save()
      .then(function(){
        done();
      });
    });

    //check that user is deleted
    it('should remove user from the database', function(done){
      knex('users')
        .where('username', 'user19')
        .del()
        .then(function(user){
          expect(user).toBeTruthy();
        done();
      });
    });
  });

});
