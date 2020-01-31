import { Model, snakeCaseMappers } from 'objection';

export default class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
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

  static async createGuest() {
    const guestUser = await this.query().insert();
    return guestUser;
  }

  static async getUserById(userId: number): Promise<User> {
    const user = await this.query().findById(userId);
    return user;
  }
}
