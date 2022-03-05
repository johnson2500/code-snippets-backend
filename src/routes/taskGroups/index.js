import getTaskGroups from './services/getTaskGroups';
import getTaskGroup from './services/getTaskGroup';
import postTaskGroup from './services/postTaskGroup';
import taskSchemas from './schemas/taskGroupSchemas';
import validator from '../../helpers/validator';

export default (app) => {
  app.post(
    '/task-group',
    validator(taskSchemas.postTaskSchema),
    getTaskGroups,
  );
  app.get(
    '/task-group/:taskId',
    validator(taskSchemas.getTaskSchema),
    getTaskGroup,
  );
  app.get(
    '/task-groups',
    validator(taskSchemas.getTasksSchema),
    postTaskGroup,
  );
};
