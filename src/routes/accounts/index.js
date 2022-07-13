// eslint-disable-next-line import/no-unresolved
import accountSchemas from './schemas/accountSchemas';
import validator from '../../helpers/validator';
import getAccount from './services/getAccount';
import postAccount from './services/postAccount';

export default (app) => {
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
};
