import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { IAppState } from '../../reducers';
import { DemoChatRoomComponents } from '../../components';
import {
  chatRoomActions,
  IAuthState,
  IChatRoomState,
} from '../../actions';


import { ChatRoomComponents } from './components';
import './chat-room-page.scss';

const RoomPage = (props: {
  chatRoomState: IChatRoomState;
  authState: IAuthState;
}) => {
  const dispatch = useDispatch();
  const [loadMore, setLoadMore] = useState(false);
  const ws = useRef<any>(null);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    dispatch(
      chatRoomActions.getConversation(props.chatRoomState.currentPage || 1),
    );

    ws.current = new WebSocket(process.env.REACT_APP_BASE_WS as string);

    ws.current.onopen = () => {
      const data = {
        roomId: props.authState.data?.roomId,
        action: 'open-connection',
      };

      ws.current.send(JSON.stringify(data));
    };

    ws.current.onclose = () => {
      const data = {
        roomId: props.authState.data?.roomId,
        action: 'close-connection',
      };

      ws.current.send(JSON.stringify(data));
    };

    ws.current.onmessage = (e: any) => {
      const data = JSON.parse(e.data);

      dispatch(chatRoomActions.updateConversation(data.record));

      scrollToBottom();
    };

    const conversation = document.getElementById('conversation');

    conversation?.addEventListener('scroll', (e: any) => {
      const el = e.target;

      if (el.scrollTop === 0) {
        setLoadMore(true);
      }
    });

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  useEffect(() => {
    if (
      props.chatRoomState.currentPage !== undefined &&
      (props.chatRoomState.conversation?.length || 0) <
        (props.chatRoomState.total || 0)
    ) {
      dispatch(
        chatRoomActions.getConversation(props.chatRoomState.currentPage + 1),
      );
    }

    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    if (props.chatRoomState.currentPage === 1) {
      scrollToBottom();
    }
  }, [props.chatRoomState.currentPage]);

  const onSubmitMessage = (message: string) => {
    const data = {
      message,
      roomId: props.authState.data?.roomId,
      username: props.authState.data?.username,
      action: 'send-message',
    };

    if (!ws.current) return;

    ws.current.send(JSON.stringify(data));
  };

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <ChatRoomComponents.ChatRoomHeaderComponent />
      <div className="messenger" id="conversation">
        {props.chatRoomState.conversation
          ?.sort((a, b) => {
            return +new Date(a.createdDate) - +new Date(b.createdDate);
          })
          ?.map((item: any) => (
            <DemoChatRoomComponents.ChatRoomMessage
              key={`message-${item.id}`}
              author={
                props.authState.data?.username !== item.userId.username
                  ? item.userId.username
                  : undefined
              }
              message={item.message}
              class="mb-5"
            />
          ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatRoomComponents.ChatRoomFooterComponent
        onSubmitMessage={(message: string) => onSubmitMessage(message)}
      />
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  authState: state.authState,
  chatRoomState: state.chatRoomState,
});

export default connect(mapStateToProps)(RoomPage);
