"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
exports.generateJwtToken = (payload) => {
    const payloadPlainObj = Object.assign({}, payload);
    const token = jsonwebtoken_1.default.sign(payloadPlainObj, process.env.VENOTES_JWT, {
        expiresIn: '180 days'
    });
    return token;
};
exports.verifyJwtToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.VENOTES_JWT);
        return decoded;
    }
    catch (e) {
        console.log('JWT verification error');
        throw new errors_1.CustomError('Failed to verify JWT token', 'INVALID_TOKEN', 401);
    }
};
