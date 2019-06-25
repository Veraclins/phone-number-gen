import 'dotenv/config';
import logger from './helpers/logger';

import app from './app';

const server = app.listen(app.get('port'), () => {
  logger.info(
    `App is running at http://localhost:${app.get('port')} in ${app.get(
      'env'
    )} mode`
  );
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    logger.debug('Address in use, closing...');
    setTimeout(() => {
      server.close();
    }, 1000);
  } else {
    logger.log('here');
    logger.debug(err.code, err);
  }
});

export default server;
