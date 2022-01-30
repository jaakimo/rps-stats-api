import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import rpsRouter from './routes/rps';
import { logger } from './utils/loggers';

export const createApp = () => {
  const app = express();

  app.use(
    cors({ origin: ['https://rps-stats-app.herokuapp.com', 'localhost'] }),
  );
  //simple logger middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger(`${req.method} ${req.url} -- ${res.statusCode}`);
    next();
  });
  app.use(express.json());

  app.use('/api/rps', rpsRouter);

  return app;
};
