import { Route, RoutePrefix } from '../utilities';
import { authController } from '../controller';
import { authentication } from '../middlewares';

const baseUrl = RoutePrefix + '/auth';

export const authRoutes: Route[] = [
  {
    method: 'post',
    path: `${baseUrl}/login`,
    middleware: [],
    handler: authController.login,
  },
  {
    method: 'post',
    path: `${baseUrl}/logout`,
    middleware: [authentication.checkJwt],
    handler: authController.logout,
  },
  {
    method: 'post',
    path: `${baseUrl}/validate`,
    middleware: [authentication.checkJwt],
    handler: authController.validateToken,
  },
];
