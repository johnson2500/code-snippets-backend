import usersRoutes from './users';
import tasksRoutes from './tasks';
// import todoRoutes from './todos';

export default (app, logger) => {
  // todoRoutes(app, logger);
  usersRoutes(app, logger);
  tasksRoutes(app, logger);
};
