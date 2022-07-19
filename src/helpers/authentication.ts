import { getAuth } from 'firebase-admin/auth';
import { Response, Request } from 'express';
const exceptions = new Set([
  '/user-name/exists',
  'user/session-login',
  '/test',
]);


export async function getUserId(token: string): Promise<string> {
  const decodedToken = await getAuth()
    .verifyIdToken(token);

  return decodedToken.uid;
}


export default async (req: Request, res: Response, next): Promise<void> => {
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
