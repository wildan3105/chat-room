import { injectEnv } from '../utilities';

injectEnv();

const processEnv = process.env;

export const JWT_SECRET_KEY = processEnv.JWT_SECRET_KEY || '';
export const ENVIRONMENT = processEnv.NODE_ENV;
export const PORT = processEnv.PORT || 3000;
export const WSS_PORT = Number(processEnv.WSS_PORT) || 3001;
export const CORS_URL = processEnv.CORS_URL;
export const DATABASE_URL = processEnv.DATABASE_URL || '';
export const COLLATION_LOCALE = processEnv.COLLATION_LOCALE || 'en_US';