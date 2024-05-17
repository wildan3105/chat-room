import { Route } from '../utilities';

import { authRoutes } from './auth.route';
import { roomRoutes } from './room.route';

export const routes: Route[] = [...authRoutes, ...roomRoutes];
