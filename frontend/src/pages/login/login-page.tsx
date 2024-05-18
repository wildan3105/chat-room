import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { IAppState } from '../../reducers';
import {
  DemoChatRoomComponents,
  ShapeButtonEnum,
  TypeButtonEnum,
} from '../../../src/components';
import { authActions, IAuthState } from '../../actions';

const HomePage = (props: { authState: IAuthState }) => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState<boolean>(true);
  const [paramsLogin, setParamsLogin] = useState<{
    username: {
      value: string;
      valid: boolean;
    };
    roomId: {
      value: string;
      valid: boolean;
    };
  }>({
    username: {
      valid: false,
      value: '',
    },
    roomId: {
      valid: false,
      value: '',
    },
  });

  const onChangeValue = (e: any, valid?: boolean) => {
    const data: any = {
      ...paramsLogin,
      [e.target.name]: { value: e.target.value, valid },
    };

    const errorFields = Object.keys(data).filter(
      (fieldName) => !data[fieldName].valid,
    );

    setHasError(errorFields.length > 0);
    setParamsLogin(data);
  };

  const login = () => {
    dispatch(
      authActions.login({
        roomId: paramsLogin.roomId.value,
        username: paramsLogin.username.value,
      }),
    );
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && !hasError) {
      login();
    }
  };

  return (
    <div className="home">
      <h3 className="mb-4 text-center">Join Chatroom</h3>
      <div className="mb-5">
        <div className="mb-3">
          <DemoChatRoomComponents.ChatRoomInput
            name="username"
            onChange={(e, valid) => onChangeValue(e, valid)}
            onKeyDown={handleKeyDown}  // Add key down handler
            placeholder="Username"
            class="w-100"
            required={true}
            showAsterisk={false}
          />
        </div>
        <div className="mb-3">
          <DemoChatRoomComponents.ChatRoomInput
            name="roomId"
            onChange={(e, valid) => onChangeValue(e, valid)}
            onKeyDown={handleKeyDown}  // Add key down handler
            class="w-100"
            placeholder="RoomID"
            required={true}
            showAsterisk={false}
          />
        </div>
      </div>

      <DemoChatRoomComponents.ChatRoomButton
        text="JOIN"
        type={TypeButtonEnum.Primary}
        shape={ShapeButtonEnum.RoundPill}
        class="mt-5 w-100 font-weight-bold"
        onClick={login}
        disabled={hasError}
      />
      {props.authState.hasError && (
        <p className="mt-3 font-italic text-danger text-center">
          {props.authState.errMessage}
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  authState: state.authState,
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
