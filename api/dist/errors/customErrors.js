"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(message, code = 'INTERNAL_ERROR', status = 500, data = {}) {
        super();
        this.message = message;
        this.code = code;
        this.status = status;
        this.data = data;
    }
}
exports.CustomError = CustomError;
