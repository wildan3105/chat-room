import { put, takeLatest, call } from 'redux-saga/effects';

import { API_END_POINTS } from '../../constants';
import { crudBase, IApiResponse } from '../../helpers';

import chatRoomConstants from './chat-room-constants';

const submitMessageService = (message: string) => {
  return crudBase.post(API_END_POINTS.ROOM, {
    message,
  });
};

const getConversationService = (currentPage?: number) => {
  return crudBase.get(`${API_END_POINTS.ROOM}?currentPage=${currentPage}`);
};

function* submitMessage(payload: any) {
  try {
    const res: IApiResponse = yield call(submitMessageService, payload.message);

    yield put({ type: chatRoomConstants.SUBMIT_MESSAGE_SUCCESS });
  } catch (error: any) {
    const message = error.message;

    yield put({ type: chatRoomConstants.SUBMIT_MESSAGE_FAILURE, message });
  }
}

function* getConversation(payload: any) {
  try {
    const res: IApiResponse = yield call(
      getConversationService,
      payload.currentPage,
    );
    const conversation = res.data.record;
    const currentPage = res.data.currentPage;
    const total = res.data.total;

    yield put({
      type: chatRoomConstants.GET_CONVERSATION_SUCCESS,
      conversation,
      currentPage,
      total,
    });
  } catch (error: any) {
    const message = error.message;

    yield put({ type: chatRoomConstants.GET_CONVERSATION_FAILURE, message });
  }
}

function* updateConversation(payload: any) {
  try {
    yield put({
      type: chatRoomConstants.UPDATE_CONVERSATION_SUCCESS,
    });
  } catch (error: any) {
    const message = error.message;

    yield put({ type: chatRoomConstants.UPDATE_CONVERSATION_FAILURE, message });
  }
}

export default function* watchChatRoom() {
  yield takeLatest(chatRoomConstants.SUBMIT_MESSAGE_REQUEST, submitMessage);
  yield takeLatest(chatRoomConstants.GET_CONVERSATION_REQUEST, getConversation);
  yield takeLatest(
    chatRoomConstants.UPDATE_CONVERSATION_REQUEST,
    updateConversation,
  );
}
