import {
  Request,
  Response,
  NextFunction,
  RequestHandler as Middleware,
} from 'express';

import * as jwt from 'jsonwebtoken';

import { JWT_SECRET_KEY } from '../config';

import {
  HEADER_TOKEN_NAME,
  HEADER_TOKEN_KEY_NAME,
} from '../utilities';

const checkJwt: Middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let jwtPayload: any;

  try {
    jwtPayload = decodeToken(req);
    res.locals.jwtPayload = jwtPayload;
  } catch (error: any) {
    res.status(401).send();
    return;
  }

  const { userId, roomId } = jwtPayload;
  const newToken = createToken(userId, roomId);
  res.setHeader(HEADER_TOKEN_NAME, newToken);

  next();
};

const decodeToken = (req: Request) => {
  if (!req) return null;
  const token = req.headers[HEADER_TOKEN_KEY_NAME] as string;

  if (!token) return null;

  return jwt.verify(token, JWT_SECRET_KEY);
};

const createToken = (userId: string, roomId: string) => {
  return jwt.sign(
    {
      userId,
      roomId,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: '1h',
      algorithm: 'HS256'
    }
  );
};

const getPayload = (res: Response): { userId: string; roomId: string } => {
  return res.locals.jwtPayload;
};

export const authentication = {
  checkJwt,
  createToken,
  getPayload,
};
