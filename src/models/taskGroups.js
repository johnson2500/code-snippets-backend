import Tasks from './tasks';

const { Model, snakeCaseMappers } = require('objection');

export default class TaskGroup extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tasks.task_group';
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

  static get relationMappings() {
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Tasks,
        join: {
          from: 'tasks.task_group.id',
          to: 'tasks.tasks.task_group_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'userId'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        user_id: { type: 'integer' },
        archived: { type: 'boolean' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        archived_at: { type: 'string' },
      },
    };
  }
}
