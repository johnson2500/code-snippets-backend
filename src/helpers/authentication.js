import { getUserId } from './index';

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

    const { authorization } = req.headers;
    const token = authorization.split('Bearer ')[1];
    const ownerId = await getUserId(token);
    req.ownerId = ownerId;
    req.token = token;
  } catch (error) {
    console.log(`${Date.now()}: Authentication Error: ${error.message}`);
    res.status(401).send(error.message);
    return;
  }
  next();
};
