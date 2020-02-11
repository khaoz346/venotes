import { Model, snakeCaseMappers } from 'objection';
import _ from 'lodash';
import { generateJwtToken } from '../../utils/auth';
import { CustomError } from '../../errors';

enum Role {
  member,
  guest
}

export default class User extends Model {
  readonly id!: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  role!: Role;
  createdAt!: Date;
  updatedAt!: Date;

  static tableName = 'users';

  static idColumn = 'id';

  static columnNameMappers = snakeCaseMappers();

  static jsonSchema = {
    type: 'object',

    // required: ['id', 'role', 'created_at', 'updated_at'],

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

  static async createGuest() {
    const insertResult = await this.query().insert({});
    const { id: userId } = insertResult;
    const guestUser = await this.query().findById(userId);
    return guestUser;
  }

  //Create a user with email and password. If the email already exists, throw an error.
  //Once a user is created, return that user
  static async createUser(args: any) {
    const { password, firstName, lastName, role = 'member' } = args;
    let { email } = args;
    if (!email || !password) {
      throw new CustomError(
        'Missing email or password',
        'VALIDATION_ERROR',
        400
      );
    }

    if (await this.getUserByEmail(email)) {
      throw new CustomError('Email already exists', 'VALIDATION_ERROR', 409);
    }

    email = email.toLowerCase();

    const insertResult = await this.query().insert({
      email,
      password,
      firstName,
      lastName,
      role
    });

    const { id: userId } = insertResult;
    const user = await this.query().findById(userId);
    return user;
  }

  static async getUserById(userId: number): Promise<User> {
    const user = await this.query().findById(userId);
    return user;
  }

  static async getUserByEmail(email: string): Promise<User> {
    const user = await this.query().where({ email });
    return user[0];
  }

  static async login(email: string, password: string): Promise<string> {
    const user = await this.query().where({ email, password });
    //TODO: error handling if no user found...
    if (_.isEmpty(user)) {
      throw new CustomError(
        'Login credentials do not exist',
        'INVALID_LOGIN',
        401
      );
    }
    const payload = user[0];
    const jwt = await generateJwtToken(payload);
    return jwt;
  }
}
