'use strict';

module.exports = {
  database: {
    test: {
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'charmingmel',
        database: 'users_testdb'
      }
    }
    // development: {
    //   client: 'pg',
    //   connection: {
    //     // host: 'localhost'
    //     user: 'charmingmel',
    //     // database: 'user_testdb'
    //   }
    // }
  }
};