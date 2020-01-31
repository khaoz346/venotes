import * as Knex from 'knex';
const TABLE_NAME = 'users';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE_NAME, (table: Knex.TableBuilder) => {
    table.increments('id').primary();

    table.string('email').nullable();

    table.string('password').nullable();

    table.string('first_name').nullable();

    table.string('last_name').nullable();

    table
      .string('role')
      .notNullable()
      .defaultTo(knex.raw("'guest'"));

    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE_NAME);
}
