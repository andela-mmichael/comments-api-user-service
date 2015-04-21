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
        host: 'ec2-54-225-135-30.compute-1.amazonaws.com',
        user: 'jqparcyqmsydfu',
        password: 'xN4iMbnKnPESpGirUCA0s4Yb6w'
        database: 'dg5betu13rncn',
        port: 5432
      },
      debug: true
    }
    table_name: 'users'
  }
};