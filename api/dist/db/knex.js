"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require('../knexfile');
console.log(config);
var knex = require('knex')(config);
var Model = require('objection').Model;
exports.setupKnex = function () {
    Model.knex(knex);
    knex.migrate.latest();
};
