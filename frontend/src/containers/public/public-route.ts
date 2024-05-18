import { DemoChatRoomPages } from '../../pages';

import { Route } from '../types';

export const publicRoutes: Route[] = [
  {
    path: '/login',
    name: 'Login',
    exact: true,
    component: DemoChatRoomPages.LoginPage,
  },
];
