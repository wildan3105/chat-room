import React from 'react';
import { connect, useDispatch } from 'react-redux';

import {
  DemoChatRoomComponents,
  TypeButtonEnum,
} from '../../../components';
import { IAppState } from '../../../reducers';
import { authActions, IAuthState } from '../../../actions';

const ChatRoomHeaderComponent = (props: { authState: IAuthState }) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className="fixed-header">
      <div className="w-100 d-flex">
        <h3 className="w-100 text-center">{props.authState.data?.roomId}</h3>
        <span className="position-absolute mt-1">
          <DemoChatRoomComponents.ChatRoomButton
            text="Exit"
            type={TypeButtonEnum.Link}
            onClick={logout}
          />
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  authState: state.authState,
});

export default connect(mapStateToProps)(ChatRoomHeaderComponent);
