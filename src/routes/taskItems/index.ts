import taskItemsSchemas from './schemas/taskItemsSchemas';
import validator from '../../helpers/validator';
import postTaskItem from './services/postTaskItem';
import express from 'express'

export default (app: express.Application): void => {
  app.post(
    '/task-item',
    validator(taskItemsSchemas.postTaskItemSchema),
    postTaskItem,
  );
};
