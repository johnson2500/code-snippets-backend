// eslint-disable-next-line import/no-unresolved
import { getAuth } from 'firebase-admin/auth';

export async function getUserId(token) {
  const decodedToken = await getAuth()
    .verifyIdToken(token);

  return decodedToken.uid;
}

export async function isAuthorizedFor(token, uuid) {
  // idToken comes from the client app
  try {
    const uid = await getUserId(token);
    console.log(uuid, uid);

    if (!uid || uuid !== uid) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function getDataFromSnapshot(snapshot) {
  const data = [];

  snapshot.forEach((doc) => {
    console.log(doc.id);
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
}
