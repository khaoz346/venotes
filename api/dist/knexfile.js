"use strict";
// Update for other dev envs
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            database: 'venotes',
            user: 'root',
            password: 'venotes',
            charset: 'utf8'
        },
        migrations: {
            directory: __dirname + '/db/knex/migrations'
        }
    },
    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
