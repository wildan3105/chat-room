// tslint:disable-next-line:no-submodule-imports
import 'module-alias/register';

import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

import { routes } from '../src/routes';
import {
  CORS_URL,
  DATABASE_URL,
  ENVIRONMENT,
  PORT,
} from '../src/config';
import {
  InternalError,
  InternalErrorResponse,
  NotFoundError,
  ResponseError,
} from '../src/helper';
import { dbConnect } from '../src/models';
import { loggerService } from '../src/services';
import { realtimeConnect } from '../src/real-time';

process.on('uncaughtException', (e) => {
  console.error(`Uncaught Exception ${JSON.stringify(e)}`);
});

const allowedOrigins = [`${CORS_URL}`];

const app = express();

app.use(json({ limit: '10mb' }));
app.use(urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(helmet());

app.use(cors({
  // TODO: register/load the URL in the env
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true,
}));

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

loggerService.info('Stating db connect');
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
