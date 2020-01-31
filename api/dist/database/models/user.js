"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class User extends objection_1.Model {
    static get tableName() {
        return 'users';
    }
    static get idColumn() {
        return 'id';
    }
    static get columnNameMappers() {
        return objection_1.snakeCaseMappers();
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['id', 'role', 'created_at', 'updated_at'],
            properties: {
                id: { type: 'integer' },
                email: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                password: { type: 'string' },
                role: { type: 'string', enum: ['member', 'guest'] },
                createdAt: { type: 'date' },
                updatedAt: { type: 'date' }
            }
        };
    }
    static createGuest() {
        return __awaiter(this, void 0, void 0, function* () {
            const guestUser = yield this.query().insert();
            return guestUser;
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.query().findById(userId);
            return user;
        });
    }
}
exports.default = User;
