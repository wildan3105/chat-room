import authConstants from './auth-constants';
import { IAuthAction, IAuthInfo, IAuthLogin } from './auth-interfaces';

const login = (params: IAuthLogin): IAuthAction => {
  return {
    type: authConstants.LOGIN_REQUEST,
    login: params,
  };
};

const loginSuccessfully = (data: IAuthInfo): IAuthAction => {
  return {
    type: authConstants.LOGIN_SUCCESS,
    data,
  };
};

const loginFailure = (errMessage: string): IAuthAction => {
  return {
    type: authConstants.LOGIN_FAILURE,
    errMessage,
  };
};

const validateToken = (): IAuthAction => {
  return {
    type: authConstants.VALIDATE_TOKEN_REQUEST,
  };
};

const validateTokenSuccessfully = (): IAuthAction => {
  return {
    type: authConstants.VALIDATE_TOKEN_SUCCESS,
  };
};

const validateTokenFailure = (): IAuthAction => {
  return {
    type: authConstants.VALIDATE_TOKEN_FAILURE,
  };
};

const logout = (): IAuthAction => {
  return {
    type: authConstants.LOGOUT_REQUEST,
  };
};

const logoutSuccessfully = (): IAuthAction => {
  return {
    type: authConstants.LOGOUT_SUCCESS,
  };
};

const logoutFailure = (): IAuthAction => {
  return { type: authConstants.LOGOUT_FAILURE };
};

export const authActions = {
  login,
  loginSuccessfully,
  loginFailure,
  validateToken,
  validateTokenSuccessfully,
  validateTokenFailure,
  logout,
  logoutSuccessfully,
  logoutFailure,
};
