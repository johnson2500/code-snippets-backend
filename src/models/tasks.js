const { Model, snakeCaseMappers } = require('objection');

export default class Tasks extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tasks.tasks';
  }

  static get idColumn() {
    return 'id';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  $beforeInsert() {
    this.archived = false;
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'ownerId'],
      properties: {
        id: { type: 'integer' },
        task_group_id: { type: 'integer' },
        title: { type: 'string' },
        notes: { type: 'string' },
        owner_id: { type: 'string' },
        due_date: { type: 'string' },
        archived: { type: 'boolean' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        archived_at: { type: 'string' },
      },
    };
  }
}
