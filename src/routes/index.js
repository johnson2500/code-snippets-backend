import usersRoutes from './users';
import tasksRoutes from './tasks';

export default (app, logger) => {
  usersRoutes(app, logger);
  tasksRoutes(app, logger);
};
