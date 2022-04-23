import { getUserId } from './index';
import admin from '../firebase';

const exceptions = new Set([
  '/user-name/exists',
  'user/session-login',
]);

export default async (req, res, next) => {
  try {
    if (exceptions.has(req.path)) {
      next();
      return;
    }

    // eslint-disable-next-line no-undef
    // const cookie = await chrome.cookies.get({ url: 'http://localhost:3000', name: '__session' });

    console.log('cookie', req.cookies);

    const { authorization } = req.headers;
    console.log(authorization);
    const token = authorization.split('Bearer ')[1];
    const ownerId = await getUserId(admin, req.cookie);
    req.ownerId = ownerId;
    req.token = token;
  } catch (error) {
    console.log(`${Date.now()}: Authentication Error: ${error.message}`);
    res.status(401).send(error.message);
    return;
  }
  next();
};
