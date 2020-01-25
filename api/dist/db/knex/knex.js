"use strict";
//Creates knex instance
var environment = 'development';
var config = require('../../knexfile')[environment];
console.log(config);
module.exports = require('knex')(config);
