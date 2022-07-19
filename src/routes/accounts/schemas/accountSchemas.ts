// schemas.js
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const Joi = require('joi');

export default {
  postAccountSchema: Joi.object().keys({
    body: Joi.object().keys({
      name: Joi.string().required(),
    }).required(),
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
  }),
  getAccountSchema: Joi.object().keys({
    body: Joi.object().keys({}),
    params: Joi.object().keys({
      accountId: Joi.string(),
    }),
    query: Joi.object().keys({}),
  }),
  getAccountsSchema: Joi.object().keys({
    body: Joi.object().keys({}),
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
  }),
  getAccountAllSchema: Joi.object().keys({
    body: Joi.object().keys({}),
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
  }),
};
