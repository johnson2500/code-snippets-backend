import usersRoutes from './users';
import testRoutes from './tests';
import todoListRoutes from './todoLists';
import todoListItemsRoutes from './todoListItems';
import projectRoutes from './projects';
import accountsRoutes from './accounts';
import express from 'express'

export default (app: express.Application): void => {
  usersRoutes(app);
  todoListRoutes(app);
  todoListItemsRoutes(app);
  testRoutes(app);
  projectRoutes(app);
  accountsRoutes(app);
};
