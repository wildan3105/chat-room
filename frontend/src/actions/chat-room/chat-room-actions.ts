import { IChatRoomAction, IConversation } from '.';
import chatRoomConstants from './chat-room-constants';

const submitMessage = (message: string): IChatRoomAction => {
  return {
    type: chatRoomConstants.SUBMIT_MESSAGE_REQUEST,
    message,
  };
};

const submitMessageSuccessfully = (): IChatRoomAction => {
  return {
    type: chatRoomConstants.SUBMIT_MESSAGE_SUCCESS,
  };
};

const submitMessageFailure = () => {
  return {
    type: chatRoomConstants.SUBMIT_MESSAGE_FAILURE,
  };
};

const getConversation = (currentPage: number): IChatRoomAction => {
  return {
    type: chatRoomConstants.GET_CONVERSATION_REQUEST,
    currentPage,
  };
};

const getConversationSuccessfully = (conversation: IConversation[]) => {
  return {
    type: chatRoomConstants.GET_CONVERSATION_SUCCESS,
    conversation,
  };
};

const getConversationFailure = () => {
  return {
    type: chatRoomConstants.GET_CONVERSATION_FAILURE,
  };
};

const updateConversation = (conversation: IConversation[]) => {
  return {
    type: chatRoomConstants.UPDATE_CONVERSATION_REQUEST,
    conversation,
  };
};

const updateConversationSuccessfully = () => {
  return {
    type: chatRoomConstants.GET_CONVERSATION_SUCCESS,
  };
};

const updateConversationFailure = () => {
  return {
    type: chatRoomConstants.GET_CONVERSATION_FAILURE,
  };
};

export const clearConversation = () => ({
  type: chatRoomConstants.CLEAR_CONVERSATION,
});

export const chatRoomActions = {
  submitMessage,
  submitMessageSuccessfully,
  submitMessageFailure,
  getConversation,
  getConversationSuccessfully,
  getConversationFailure,
  clearConversation,
  updateConversation,
  updateConversationSuccessfully,
  updateConversationFailure,
};
