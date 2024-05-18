import { IAuthState, IChatRoomState } from '../actions';

export interface IAppState {
  authState: IAuthState;
  chatRoomState: IChatRoomState;
}
