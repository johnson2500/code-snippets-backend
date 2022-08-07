import taskItemsSchemas from './schemas/taskItemsSchemas';
import validator from '../../helpers/validator';
import postTaskItem from './services/postTaskItem';
import express from 'express'
import updateComplete from './services/updateComplete';

export default (app: express.Application): void => {
  app.post(
    '/task-item',
    validator(taskItemsSchemas.postTaskItemSchema),
    postTaskItem,
  );

  app.post(
    '/task-item/update-complete',
    validator(taskItemsSchemas.updateCompleteSchema),
    updateComplete,
  );
};
