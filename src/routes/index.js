// eslint-disable-next-line import/no-unresolved
import usersRoutes from './users';
import testRoutes from './tests';
import signUp from './signUp';
import todoRoutes from './todos';

export default (app, logger) => {
  usersRoutes(app, logger);
  todoRoutes(app, logger);
  testRoutes(app, logger);
  signUp(app, logger);
};
