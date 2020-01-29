"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('./knexConfig');
const knex = require('knex')(config);
const { Model } = require('objection');
exports.setupKnex = () => {
    Model.knex(knex);
    knex.migrate.latest();
};
