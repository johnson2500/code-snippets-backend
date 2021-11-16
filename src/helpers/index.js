/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

export async function getUserId(admin, token) {
  // idToken comes from the client app
  const decodedToken = await admin
    .auth()
    .verifyIdToken(token);

  return decodedToken.uid;
}

export async function isAuthorizedFor(admin, token, uuid) {
  // idToken comes from the client app
  try {
    const uid = await getUserId(admin, token);
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
