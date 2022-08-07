import usersRoutes from './users';
import projectRoutes from './projects';
import accountsRoutes from './accounts';
import express from 'express'
import taskItemsRoutes from './taskItems';

export default (app: express.Application): void => {
  usersRoutes(app);
  projectRoutes(app);
  accountsRoutes(app);
  taskItemsRoutes(app)
};
