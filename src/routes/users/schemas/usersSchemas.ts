// schemas.js
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const Joi = require('joi');

export default {
  signUpUserSchema: Joi.object().keys({
    body: Joi.object().keys({
      email: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      birthDay: Joi.date(),
      gender: Joi.string(),
      usage: Joi.string(),
      career: Joi.string(),
    }),
  }),
  sessionLoginSchema: Joi.object().keys({
    body: Joi.object().keys({
      csrfToken: Joi.string(),
    }),
  }),
  postUserSchema: Joi.object().keys({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  }),
  getUserSchema: Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  getUsersSchema: Joi.object().keys({
    body: Joi.object().keys({}),
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
  }),
  checkUsernameSchema: Joi.object().keys({
    query: Joi.object().keys({
      userName: Joi.string().required(),
    }),
  }),
  putUserSchema: Joi.object().keys({
    body: Joi.object().keys({}),
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
  }),
};
