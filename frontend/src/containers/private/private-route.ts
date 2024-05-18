import { DemoChatRoomPages } from '../../pages';

import { Route } from '../types';
import { publicRoutes } from '../public/public-route';

export const privateRoutes: Route[] = [
  ...publicRoutes,
  {
    path: '/',
    name: 'Room',
    exact: true,
    component: DemoChatRoomPages.ChatRoomPage,
  },
];
