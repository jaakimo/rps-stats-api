import { createApp } from './app';
import { connectWS } from './utils/websocketClient';
import { errorLogger, logger } from './utils/loggers';
import { createConnection } from 'typeorm';
import { initDb } from './utils/db';

createConnection().then(async () => {
  await initDb();

  connectWS();

  const app = createApp();
  app.listen(process.env.PORT || 3001, () =>
    logger(`server listening at port: `, process.env.PORT || 3001),
  );
  app.addListener('error', (e) => errorLogger(e));
});
