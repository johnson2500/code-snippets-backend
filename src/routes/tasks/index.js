import getTasks from './services/getTasks';
import getTask from './services/getTask';
import postTask from './services/postTask';
import taskSchemas from './schemas/taskSchemas';
import validator from '../../helpers/validator';

export default (app) => {
  app.post(
    '/task',
    validator(taskSchemas.postTaskSchema),
    postTask,
  );
  app.get(
    '/task',
    validator(taskSchemas.getTaskSchema),
    getTask,
  );
  app.get(
    '/tasks',
    validator(taskSchemas.getTasksSchema),
    getTasks,
  );
};
