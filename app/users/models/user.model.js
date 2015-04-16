var db = require('../../../config/db.config');
var knex = require('knex')(db.database[process.env.NODE_ENV]);
var bookshelf = require('bookshelf')(knex);

console.log(db.database.test);
console.log('got here');
knex.schema.hasTable('usersnew').then(function(exists) {
  console.log(exists);
  if (!exists) {
   knex.schema.createTable('usersnew', function(table){
  console.log('Users Table is Created!');
      table.increments('id').primary();
      table.string('first_name', 254);
      table.string('last_name', 254);
      table.string('username', 254);
      table.string('email'), 254;
      table.string('password', 254);
      table.timestamps();
    }).then(function(){
      console.log("Created!!");
    });
  }
});

var UsersModel = bookshelf.Model.extend({
  tableName: 'usersnew'
});

UsersModel.forge({first_name: 'Sunny', last_name: 'Ade', username: 'sunade', email: 'sunny_ade', password: '12345' })
  .save();
knex.schema.dropTable('users');

module.exports = UsersModel;
