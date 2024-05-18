import authConstants from './auth-constants';
import { IAuthAction, IAuthState, initAuthReducer } from './auth-interfaces';

export default function authReducers(
  state = initAuthReducer,
  action: IAuthAction,
): IAuthState {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST: {
      return {
        ...state,
        state: action.type,
        data: {
          token: '',
          userId: '',
          roomId: '',
        },
        isAuthenticated: false,
        isLoading: true,
        hasError: false,
        errMessage: undefined,
      };
    }

    case authConstants.LOGIN_FAILURE: {
      return {
        ...state,
        state: action.type,
        data: {
          token: '',
          userId: '',
          roomId: '',
        },
        isAuthenticated: false,
        isLoading: false,
        hasError: true,
        errMessage: action.errMessage,
      };
    }

    case authConstants.LOGIN_SUCCESS: {
      return {
        ...state,
        state: action.type,
        data: action.data,
        isAuthenticated: true,
        isLoading: false,
        hasError: false,
        errMessage: undefined,
      };
    }

    case authConstants.VALIDATE_TOKEN_REQUEST: {
      return {
        ...state,
        state: action.type,
        data: action.data,
        isAuthenticated: false,
        isLoading: true,
      };
    }

    case authConstants.VALIDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        state: action.type,
        data: action.data,
        isAuthenticated: true,
        isLoading: false,
      };
    }

    case authConstants.VALIDATE_TOKEN_FAILURE: {
      return {
        ...state,
        state: action.type,
        data: action.data,
        isAuthenticated: false,
        isLoading: false,
      };
    }

    case authConstants.LOGOUT_REQUEST: {
      return {
        ...state,
        state: action.type,
        isAuthenticated: false,
      };
    }

    case authConstants.LOGOUT_FAILURE: {
      return {
        ...state,
        state: action.type,
        isAuthenticated: false,
      };
    }

    case authConstants.LOGOUT_SUCCESS: {
      return {
        ...state,
        state: action.type,
        isAuthenticated: false,
      };
    }

    default:
      return state;
  }
}
