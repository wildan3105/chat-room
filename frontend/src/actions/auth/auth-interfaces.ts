import { BaseAction, BaseActionState } from '../base-action-interface';

export interface IAuthAction extends BaseAction {
  login?: IAuthLogin;
  data?: IAuthInfo;
  username?: string;
}

export interface IAuthLogin {
  username: string;
  roomId: string;
}

export interface IAuthInfo {
  userId: string;
  roomId: string;
  token: string;
  username?: string;
}

export interface IAuthState extends BaseActionState {
  data?: IAuthInfo;
  isAuthenticated: boolean;
}

export const initAuthReducer: IAuthState = {
  state: '',
  data: {
    token: '',
    userId: '',
    roomId: '',
  },
  isAuthenticated: false,
  isLoading: false,
};
