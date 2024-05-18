import { BaseAction, BaseActionState } from '../base-action-interface';

export interface IChatRoomAction extends BaseAction {
  message?: string;
  conversation?: IConversation[];
}

export interface IChatRoomState extends BaseActionState {
  message?: string;
  conversation?: IConversation[];
}

export interface IConversation {
  id: string;
  message: string;
  createdDate: string;
  user: {
    id: string;
    username: string;
  };
}

export const initChatRoomReducer: IChatRoomState = {
  state: '',
  isLoading: false,
};
