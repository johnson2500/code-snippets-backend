// eslint-disable-next-line import/no-unresolved
import usersRoutes from './users';

export default (app, logger) => {
  usersRoutes(app, logger);
};
