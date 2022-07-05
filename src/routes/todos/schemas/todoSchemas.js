// schemas.js
const Joi = require('joi');

export default {
  postTodoSchema: Joi.object().keys({
    body: Joi.object().keys({
      title: Joi.string().required(),
    }),
    params: Joi.object().keys({
    }),
    query: Joi.object().keys({
    }),
  }),
  getTodoSchema: Joi.object().keys({
    body: Joi.object().keys({}),
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
    query: Joi.object().keys({}),
  }),
  getTodosSchema: Joi.object().keys({
    body: Joi.object().keys({}),
    params: Joi.object().keys({
      todoListId: Joi.string(),
    }),
    query: Joi.object().keys({}),
  }),
  getTodoItemSchema: Joi.object().keys({
    body: Joi.object().keys({}),
    params: Joi.object().keys({
      todoListId: Joi.string(),
      todoListItemId: Joi.string(),
    }),
    query: Joi.object().keys({}),
  }),
  postTodoListItemSchema: Joi.object().keys({
    body: Joi.object().keys({
      title: Joi.string(),
      dueDate: Joi.date(),
      description: Joi.string(),
      tags: Joi.array().items(Joi.string()),
    }),
    params: Joi.object().keys({
      todoListId: Joi.string(),
    }),
    query: Joi.object().keys({}),
  }),
};
