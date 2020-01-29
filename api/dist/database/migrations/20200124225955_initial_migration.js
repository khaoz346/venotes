"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TABLE_NAME = 'users';
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable(TABLE_NAME, (table) => {
            table.increments('id').primary();
            table.string('email').notNullable();
            table.string('first_name').nullable();
            table.string('last_name').nullable();
            table
                .timestamp('created_at')
                .notNullable()
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updated_at')
                .notNullable()
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable(TABLE_NAME);
    });
}
exports.down = down;
