import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

import { routes } from './routes';
import {
  CORS_URL,
  DATABASE_URL,
  ENVIRONMENT,
  PORT,
} from './config';
import {
  InternalError,
  InternalErrorResponse,
  NotFoundError,
  ResponseError,
} from './helper';
import { dbConnect } from './models';
import { loggerService } from './services';
import { realtimeConnect } from './real-time';

process.on('uncaughtException', (e) => {
  console.error(`Uncaught Exception ${JSON.stringify(e)}`);
});

const app = express();

app.use(json({ limit: '10mb' }));
app.use(urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(helmet());

app.use(cors({ origin: CORS_URL, optionsSuccessStatus: 200 }));

routes.forEach((route) => {
  const { method, path, middleware, handler } = route;

  (app as any)[method](path, ...middleware, handler);
});

app.use((req: any, res: any, next: any) => next(new NotFoundError()));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ResponseError) {
    console.error(`${JSON.stringify(err)}`);

    ResponseError.handle(err, res);
  } else {
    console.error(`${JSON.stringify(err)}`);

    if (ENVIRONMENT === 'development') {
      return new InternalErrorResponse();
    }

    ResponseError.handle(new InternalError(), res);
  }
});

loggerService.info('Starting db connect');
dbConnect(DATABASE_URL);

loggerService.info('Starting real time connect');
realtimeConnect();

loggerService.info('Starting api');

app
  .listen(PORT, () => {
    return loggerService.info(`server running on port : ${PORT}`);
  })
  .on('error', (e: any) => {
    {
      return loggerService.error(`${JSON.stringify(e)}`);
    }
  });
