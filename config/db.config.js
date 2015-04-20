'use strict';

module.exports = {
  port: process.env.PORT || 8100,
  db: {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'charmingmel',
        database: 'usercomments'
      },
      debug: true
    },
    test: {
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'charmingmel',
        database: 'usercomments_test'
      },
      debug: true
    },
    table_name: 'users',
    secret: '@3nk507t!'
  }
};