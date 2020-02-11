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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const lodash_1 = __importDefault(require("lodash"));
const auth_1 = require("../../utils/auth");
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
            const { password, firstName, lastName, role = 'member' } = args;
            let { email } = args;
            if (!email || !password) {
                throw new errors_1.CustomError('Missing email or password', 'VALIDATION_ERROR', 400);
            }
            if (yield this.getUserByEmail(email)) {
                throw new errors_1.CustomError('Email already exists', 'VALIDATION_ERROR', 409);
            }
            email = email.toLowerCase();
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
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.query().where({ email });
            return user[0];
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.query().where({ email, password });
            if (lodash_1.default.isEmpty(user)) {
                throw new errors_1.CustomError('Login credentials do not exist', 'INVALID_LOGIN', 401);
            }
            const payload = user[0];
            const jwt = yield auth_1.generateJwtToken(payload);
            return jwt;
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
