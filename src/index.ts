import * as moduleAlias from 'module-alias';
import bodyParser from 'body-parser';
import cors from 'cors';
import loggerMiddleWare from './helpers/logger';
import authentication from './helpers/authentication';
import { createServer } from '@config/express';
import { AddressInfo } from 'net';
import http from 'http';
import { logger } from '@config/logger';
import './firebase/index';
import routes from './routes';
import './types/expressExtensions'

const sourcePath = process.env.NODE_ENV === 'development' ? 'src' : 'build';

moduleAlias.addAliases({
  '@server': sourcePath,
  '@config': `${sourcePath}/config`,
  '@domain': `${sourcePath}/domain`,
});

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '9000';

async function startServer() {
  const app = createServer();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(loggerMiddleWare);
  app.use(authentication);

  routes(app)

  const server = http.createServer(app).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    logger.info(
      `Server ready at http://${addressInfo.address}:${addressInfo.port}`,
    );
  });

  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      logger.info(`process.once ${type}`);

      server.close(() => {
        logger.debug('HTTP server closed');
      });
    });
  });
}

startServer();
