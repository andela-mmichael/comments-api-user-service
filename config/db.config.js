'use strict';

module.exports = {
  port: process.env.PORT || 8100,
  secret: '@3nk507t!',
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
    production: {
      client: 'pg',
      connection: {
        host: 'ec2-50-17-192-136.compute-1.amazonaws.com',
        user: 'pikncxtuvmoota',
        password: '8n9wSH0OJmIuaXETB3bL80tMax',
        database: 'de6tek6jj2h47o',
      },
      debug: true
    }
    table_name: 'users'
  }
};