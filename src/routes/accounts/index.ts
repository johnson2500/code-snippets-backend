import accountSchemas from './schemas/accountSchemas';
import validator from '../../helpers/validator';
import getAccount from './services/getAccount';
import postAccount from './services/postAccount';
import getAccountAll from './services/getAccountAll';
import express from 'express';

export default (app: express.Application): void => {
  app.post(
    '/account',
    validator(accountSchemas.postAccountSchema),
    postAccount,
  );

  app.get(
    '/account',
    validator(accountSchemas.getAccountSchema),
    getAccount,
  );

  app.get(
    '/account/all',
    validator(accountSchemas.getAccountAllSchema),
    getAccountAll,
  );
};
