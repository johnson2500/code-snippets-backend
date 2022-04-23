import firebase from '../../../firebase/index';

export default (req, res) => {
  // Get the ID token passed and the CSRF token.
  const idToken = req.body?.csrfToke?.toString();
  //   const csrfToken = req.body.csrfToken.toString();
  // Guard against CSRF attacks.
  //   if (csrfToken !== req.cookies.csrfToken) {
  //     res.status(401).send('UNAUTHORIZED REQUEST!');
  //     return;
  //   }
  console.log('cookie', req.cookie);
  console.log('cookies', req.cookies);
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  firebase.auth()
    .createSessionCookie(req.token, { expiresIn })
    .then(
      (sessionCookie) => {
        console.log('session', sessionCookie);
        // Set cookie policy for session cookie.
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie('__session', sessionCookie, options);
        res.end(JSON.stringify({ status: 'success' }));
      },
      (error) => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
      },
    );
};
