"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const auth_1 = require("../utils/auth");
const getAuthTokenFromRequest = (req) => {
    const header = req.get('Authorization') || '';
    const [bearer, token] = header.split(' ');
    return bearer === 'Bearer' && token ? token : null;
};
exports.authenticate = (req, _res, next) => {
    try {
        const token = getAuthTokenFromRequest(req);
        if (!token) {
            throw new errors_1.CustomError('No authentication token in request.');
        }
        const decoded = auth_1.verifyJwtToken(token);
        const userId = decoded.userId;
        if (!userId) {
            throw new errors_1.CustomError('Invalid authentication token', 'INVALID_TOKEN', 401);
        }
        req.currentUser = {
            id: 1,
            email: 'victor@gmail.com'
        };
    }
    catch (e) {
        next(e);
    }
};
