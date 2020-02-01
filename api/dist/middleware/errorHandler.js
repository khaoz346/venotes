"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = (err, _req, res, _next) => {
    console.log(err);
    return res.status(err.status).send(err.message);
};
