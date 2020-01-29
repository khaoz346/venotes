"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const { CustomError } = require('../errors');
exports.generateJwtToken = (payload) => {
    const token = jwt.sign(payload, process.env.VENOTES_JWT, {
        expiresIn: '180 days'
    });
    return token;
};
exports.verifyJwtToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.VENOTES_JWT);
        return decoded;
    }
    catch (e) {
        console.log('JWT verification error');
        throw new CustomError('Failed to verify JWT token', 'INVALID_TOKEN', 401);
    }
};
