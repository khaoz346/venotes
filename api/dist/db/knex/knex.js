"use strict";
var environment = process.env.ENVIRONMENT || 'development';
var config = require('../../knexfile')[environment];
module.exports = require('knex')(config);
