import React from 'react';

import { IMessageProps } from './interfaces';
import './message.scss';

export const ChatRoomMessage = (props: IMessageProps) => {
  return props.author ? (
    <div>
      <p className="font-weight-bold">{props.author}</p>
      <div className={`message-box message-box-author clearfix ${props.class}`}>
        {props.message}
      </div>
    </div>
  ) : (
    <div className={`message-box message-box-me clearfix  ${props.class}`}>
      {props.message}
    </div>
  );
};
