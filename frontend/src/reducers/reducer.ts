import { combineReducers } from 'redux';

import authReducers from '../actions/auth/auth-reducers';
import chatRoomReducers from '../actions/chat-room/chat-room-reducers';

import { IAppState } from './app-state';

export const reducer = combineReducers<IAppState>({
  authState: authReducers,
  chatRoomState: chatRoomReducers,
});
