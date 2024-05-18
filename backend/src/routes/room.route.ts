import { Route, RoutePrefix } from '../utilities';
import { authentication } from '../middlewares';
import { roomController } from '../controller';

const baseUrl = RoutePrefix + '/room';

export const roomRoutes: Route[] = [
  {
    method: 'get',
    path: baseUrl,
    middleware: [authentication.checkJwt],
    handler: roomController.getConversation,
  },
  {
    method: 'post',
    path: baseUrl,
    middleware: [authentication.checkJwt],
    handler: roomController.submitMessage,
  },
];
