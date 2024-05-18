import { put, takeLatest, call } from 'redux-saga/effects';

import { crudBase, IApiResponse } from '../../helpers';
import {
  API_END_POINTS,
  DEMO_CHAT_ROOM_INFO,
  axiosInstance,
  DEMO_CHAT_ROOM_TOKEN,
} from '../../constants';


import authConstants from './auth-constants';
import { IAuthLogin } from './auth-interfaces';

const loginService = (params: IAuthLogin) => {
  const { username, roomId } = params;

  return crudBase.post(`${API_END_POINTS.AUTH}/login`, {
    username,
    roomId,
  });
};

const validateTokenService = async () => {
  return crudBase.post(`${API_END_POINTS.AUTH}/validate`, null);
};

const logoutService = () => {
  return crudBase.post(`${API_END_POINTS.AUTH}/logout`, null);
};

function* loginSaga(payload: any) {
  try {
    const res: IApiResponse = yield call(loginService, payload.login);

    if (!res.isError) {
      axiosInstance.defaults.headers.common.auth = res.data.token;

      localStorage.setItem(DEMO_CHAT_ROOM_TOKEN, res.data.token);
      localStorage.setItem(DEMO_CHAT_ROOM_INFO, JSON.stringify(res.data.auth));

      yield put({
        type: authConstants.LOGIN_SUCCESS,
        data: res.data.auth,
      });
    } else {
      yield put({ type: authConstants.LOGIN_FAILURE, errMessage: res.message });
    }
  } catch (error: any) {
    yield put({ type: authConstants.LOGIN_FAILURE, errMessage: error.message });
  }
}

function* validateTokenSaga(payload: any) {
  try {
    const token = localStorage.getItem(DEMO_CHAT_ROOM_TOKEN) || '';

    if (!token) {
      yield put({ type: authConstants.VALIDATE_TOKEN_FAILURE });
    } else {
      axiosInstance.defaults.headers.common.auth = token;

      const res: IApiResponse = yield call(validateTokenService);

      if (!res.isError) {
        localStorage.setItem(DEMO_CHAT_ROOM_TOKEN, res.data.token);
        localStorage.setItem(
          DEMO_CHAT_ROOM_INFO,
          JSON.stringify(res.data.auth),
        );

        yield put({
          type: authConstants.VALIDATE_TOKEN_SUCCESS,
          data: res.data.auth,
        });
      } else {
        localStorage.setItem(DEMO_CHAT_ROOM_TOKEN, '');
        localStorage.setItem(DEMO_CHAT_ROOM_INFO, '');

        const message = res.message;

        yield put({ type: authConstants.VALIDATE_TOKEN_FAILURE, message });
      }
    }
  } catch (error: any) {
    localStorage.setItem(DEMO_CHAT_ROOM_TOKEN, '');
    localStorage.setItem(DEMO_CHAT_ROOM_INFO, '');

    const message = error.message;

    yield put({ type: authConstants.VALIDATE_TOKEN_FAILURE, message });
  }
}

function* logoutSaga(payload: any) {
  try {
    const res: IApiResponse = yield call(logoutService);

    if (!res.isError) {
      localStorage.removeItem(DEMO_CHAT_ROOM_TOKEN);
      localStorage.removeItem(DEMO_CHAT_ROOM_INFO);

      yield put({ type: authConstants.LOGOUT_SUCCESS });
    } else {
      const message = res.message;

      yield put({ type: authConstants.LOGOUT_FAILURE, message });
    }
  } catch (error: any) {
    const message = error.message;

    yield put({ type: authConstants.LOGOUT_FAILURE, message });
  }
}

export default function* watchAuth() {
  yield takeLatest(authConstants.LOGIN_REQUEST, loginSaga);
  yield takeLatest(authConstants.VALIDATE_TOKEN_REQUEST, validateTokenSaga);
  yield takeLatest(authConstants.LOGOUT_REQUEST, logoutSaga);
}
