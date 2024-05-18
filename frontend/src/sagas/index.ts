import { fork } from 'redux-saga/effects';

import watchAuth from '../actions/auth/auth-saga';
import watchChatRoom from '../actions/chat-room/chat-room-saga';

export default function* rootSaga() {
  yield fork(watchAuth);
  yield fork(watchChatRoom);
}
