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
const errors_1 = require("../../errors");
var Role;
(function (Role) {
    Role[Role["member"] = 0] = "member";
    Role[Role["guest"] = 1] = "guest";
})(Role || (Role = {}));
class User extends objection_1.Model {
    static createGuest() {
        return __awaiter(this, void 0, void 0, function* () {
            const insertResult = yield this.query().insert({});
            const { id: userId } = insertResult;
            const guestUser = yield this.query().findById(userId);
            return guestUser;
        });
    }
    static createUser(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, firstName, lastName, role = 'member' } = args;
            if (!email || !password) {
                throw new errors_1.CustomError('Missing email or password', 'VALIDATION_ERROR', 400);
            }
            if (yield this.getUserByEmail(email)) {
                throw new errors_1.CustomError('Email already exists', 'VALIDATION_ERROR', 409);
            }
            const insertResult = yield this.query().insert({
                email,
                password,
                firstName,
                lastName,
                role
            });
            const { id: userId } = insertResult;
            const user = yield this.query().findById(userId);
            return user;
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.query().findById(userId);
            return user;
        });
    }
    static getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this
                .query()
                .whereRaw(`LOWER(email) LIKE ?`, `%${userEmail.toLowerCase()}%`);
            return user[0];
        });
    }
}
exports.default = User;
User.tableName = 'users';
User.idColumn = 'id';
User.columnNameMappers = objection_1.snakeCaseMappers();
User.jsonSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string', enum: ['member', 'guest'] },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' }
    }
};
