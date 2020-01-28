"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var CustomError = require('../errors').CustomError;
exports.generateJwtToken = function (payload) {
    var token = jwt.sign(payload, process.env.VENOTES_JWT, { expiresIn: '180 days'
    });
    return token;
};
exports.verifyJwtToken = function (token) {
    try {
        var decoded = jwt.verify(token, process.env.VENOTES_JWT);
        return decoded;
    }
    catch (e) {
        console.log('JWT verification error');
        throw new CustomError('Failed to verify JWT token', 'INVALID_TOKEN', 401);
    }
};
console.log(exports.generateJwtToken({ userId: 1 }));
console.log(exports.verifyJwtToken(exports.generateJwtToken({ userId: 1 })));
