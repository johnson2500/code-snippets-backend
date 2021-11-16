const { Model, snakeCaseMappers } = require('objection');

export default class Users extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tasks.users';
  }

  static get idColumn() {
    return 'id';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userName', 'ownerId', 'email'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        user_name: { type: 'integer' },
        owner_id: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        archived_at: { type: 'string' },
      },
    };
  }
}
