var config = require('../../../config/db.config');
var knex = require('knex')(config.db[process.env.NODE_ENV]);
var bookshelf = require('bookshelf')(knex);
var userTable = config.db.table_name;

knex.schema.hasTable(userTable).then(function(exists) {
  if(!exists) {
   knex.schema.createTable(userTable, function(table){
      table.increments('id').primary();
      table.string('first_name', 254);
      table.string('last_name', 254);
      table.string('username', 254).notNullable().unique();
      table.string('email', 254).notNullable().unique();
      table.string('password', 254).notNullable().unique(),
      // table.string('auth').notNullable().unique(),
      table.timestamps();
    }).then(function(){
      console.log("Table Created!!");
    });
  }
});

var UsersModel = bookshelf.Model.extend({
  tableName: userTable
});

var UsersCollection = bookshelf.Collection.extend({
  model: UsersModel
});

module.exports = [ UsersModel, UsersCollection ];
