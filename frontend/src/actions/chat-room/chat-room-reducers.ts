import { IChatRoomAction, IConversation, initChatRoomReducer } from '.';
import chatRoomConstants from './chat-room-constants';
import { IChatRoomState } from './chat-room-interfaces';

export default function chatRoomReducers(
  state = initChatRoomReducer,
  action: IChatRoomAction,
): IChatRoomState {
  switch (action.type) {
    case chatRoomConstants.SUBMIT_MESSAGE_REQUEST: {
      return {
        ...state,
        state: action.type,
        isLoading: true,
        message: action.message,
      };
    }

    case chatRoomConstants.SUBMIT_MESSAGE_SUCCESS:
    case chatRoomConstants.SUBMIT_MESSAGE_FAILURE: {
      return {
        ...state,
        state: action.type,
        isLoading: false,
        message: '',
      };
    }

    case chatRoomConstants.GET_CONVERSATION_REQUEST: {
      return {
        ...state,
        state: action.type,
        isLoading: false,
      };
    }

    case chatRoomConstants.GET_CONVERSATION_SUCCESS: {
      return {
        ...state,
        state: action.type,
        isLoading: false,
        total: action.total,
        currentPage:
          action.conversation && action.conversation.length > 0
            ? action.currentPage
            : (state.currentPage || 2) - 1,
        conversation: updateConversationData(action, state),
      };
    }

    case chatRoomConstants.GET_CONVERSATION_FAILURE: {
      return {
        ...state,
        state: action.type,
        isLoading: false,
      };
    }

    case chatRoomConstants.UPDATE_CONVERSATION_REQUEST: {
      return {
        ...state,
        conversation: updateConversationData(action, state),
        state: action.type,
        currentPage: state.currentPage || 1,
        isLoading: false,
      };
    }

    case chatRoomConstants.CLEAR_CONVERSATION: {
      return {
        ...state,
        conversation: [],
        currentPage: undefined,
        total: 0,
      };
    }
    
    default:
      return state;
  }
}

const updateConversationData = (
  action: IChatRoomAction,
  state: IChatRoomState,
) => {
  const mergeConversation: any[] = [
    ...(action.conversation || []),
    ...(state.conversation || []),
  ];

  return mergeConversation.reduce(
    (result: IConversation[], message: IConversation) => {
      const conversationExists = result?.find((item) => item.id === message.id);

      if (!conversationExists) {
        result.push(message);
      }

      return result;
    },
    [],
  );
};
