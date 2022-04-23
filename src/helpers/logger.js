export default (req, res, next) => {
  let logText = Object.keys(req.body).length ? `body: ${JSON.stringify(req.body)}` : '';
  logText += Object.keys(req.params).length ? `params: ${JSON.stringify(req.params)}` : '';
  logText += Object.keys(req.query).length ? `query: ${JSON.stringify(req.query)}` : '';
  console.log(`[${req.method}][${req.path}] [${new Date().toLocaleString()}] ${logText}`);
  next();
};

export const appLogger = (log) => {
  if (typeof log === 'string') {
    console.log(`[${new Date().toLocaleString()}] [${log}]`);
    return;
  }

  if (log instanceof Error) {
    console.log(`[ERROR] [${new Date().toLocaleString()}] [${log.message}]`);
    return;
  }

  const { message = '', data } = log;

  console.log(`[${new Date().toLocaleString()}] [${message}] data: ${JSON.stringify(data)}`);
};
