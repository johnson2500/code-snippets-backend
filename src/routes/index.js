// eslint-disable-next-line import/no-unresolved
import usersRoutes from './users';
import testRoutes from './tests';
import signUp from './signUp';
import todoListRoutes from './todoLists';
import todoListItemsRoutes from './todoListItems';
import projectRoutes from './projects';
import accountsRoutes from './accounts';

export default (app, logger) => {
  usersRoutes(app, logger);
  todoListRoutes(app, logger);
  todoListItemsRoutes(app, logger);
  testRoutes(app, logger);
  signUp(app, logger);
  projectRoutes(app, logger);
  accountsRoutes(app, logger);
};
