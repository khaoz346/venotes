// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: __dirname + '/db/migrations'
  }
};
