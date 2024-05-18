import React, { useEffect, useState } from 'react';
import { ValueTypeInputEnum } from './enums';

import { IInputProps } from './interfaces';
import './input.scss';

export const ChatRoomInput = (props: IInputProps) => {
  const [value, setValue] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>('');

  useEffect(() => {
    setValue(props.text || '');

    if (props.required) {
      setHasError(true);
      setErrMessage('This field is required.');
    }
  }, [props.text]);

  const onChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const textInput = e.target.value;
    const invalid = (props.required && !textInput) || false;

    setValue(textInput);
    setHasError(invalid);

    if (props.onChange) {
      props.onChange(e, !invalid);
    }
  };

  const onKeyDown = (e: any) => {
    if (props.onKeyDown) {
      props.onKeyDown(e);
    }
  };

  return (
    <div className="demo-chat-room-input">
      <div className="label">
        {props.label || ''}
        <span className="required">
          {props.required && props.showAsterisk ? ' *' : ''}
        </span>
      </div>
      <input
        id={props.id}
        type={props.valueType || ValueTypeInputEnum.Text}
        className={`input ${props.class}`}
        placeholder={props.placeholder || ''}
        value={value || ''}
        name={props.name || ''}
        disabled={props.disabled || props.isLoading}
        onChange={onChangeValue}
        onKeyDown={onKeyDown}
        required={props.required}
        autoFocus={props.autoFocus}
      />
      {hasError && <p className="validate-error-message">{errMessage}</p>}
    </div>
  );
};
