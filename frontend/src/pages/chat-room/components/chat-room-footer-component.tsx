import React, { useRef, useState } from 'react';

import {
  DemoChatRoomComponents,
  ShapeButtonEnum,
  TypeButtonEnum,
} from '../../../components';

const ChatRoomFooterComponent = (props: {
  onSubmitMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState<string>('');

  const submitMessage = () => {
    setMessage('');

    props.onSubmitMessage(message);
  };

  const onChange = (e: any) => {
    setMessage(e.target.value);
  };

  const onKeyDown = (e: any) => {
    if (message && e.key === 'Enter') {
      submitMessage();
    }
  };

  return (
    <div className="fixed-bottom d-flex p-3">
      <div className="w-100">
        <DemoChatRoomComponents.ChatRoomInput
          placeholder="Message here ... "
          class="rounded-pill w-100"
          text={message}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <span className="submit-message">
          <DemoChatRoomComponents.ChatRoomButton
            type={TypeButtonEnum.Primary}
            shape={ShapeButtonEnum.Circle}
            text="↑"
            class="pb-3"
            onClick={submitMessage}
            disabled={!message}
          />
        </span>
      </div>
    </div>
  );
};

export default ChatRoomFooterComponent;
