"use strict";
module.exports = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        database: 'venotes',
        user: 'venotes',
        password: 'venotes'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: __dirname + '/../migrations'
    }
};
