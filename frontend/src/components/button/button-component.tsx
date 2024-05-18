import React from 'react';

import { ButtonConstants } from './constants';
import {
  BorderButtonEnum,
  ShapeButtonEnum,
  SizeButtonEnum,
  TypeButtonEnum,
} from './enums';
import { IButtonProps } from './interfaces';
import './button.scss';

const colorBuilder = (type: string | undefined) => {
  const typeButtonClassName = ButtonConstants.TYPE_BUTTON_CLASS;
  switch (type) {
    case TypeButtonEnum.Primary:
      return typeButtonClassName.PRIMARY;
    case TypeButtonEnum.Secondary:
      return typeButtonClassName.SECONDARY;
    case TypeButtonEnum.Success:
      return typeButtonClassName.SUCCESS;
    case TypeButtonEnum.Danger:
      return typeButtonClassName.DANGER;
    case TypeButtonEnum.Warning:
      return typeButtonClassName.WARNING;
    case TypeButtonEnum.Info:
      return typeButtonClassName.INFO;
    case TypeButtonEnum.Light:
      return typeButtonClassName.LIGHT;
    case TypeButtonEnum.Dark:
      return typeButtonClassName.DARK;
    case TypeButtonEnum.Link:
      return typeButtonClassName.LINK;
    default:
      return typeButtonClassName.DEFAULT;
  }
};

const borderBuilder = (border: string | undefined) => {
  const borderButtonClassName = ButtonConstants.BORDER_BUTTON_CLASS;
  switch (border) {
    case BorderButtonEnum.Dashed:
      return borderButtonClassName.DASHED;
    case BorderButtonEnum.Default:
      return borderButtonClassName.DEFAULT;
    case BorderButtonEnum.None:
    default:
      return borderButtonClassName.NONE;
  }
};

const shapeBuilder = (shape: string | undefined) => {
  const shapeButtonClassName = ButtonConstants.SHAPE_BUTTON_CLASS;
  switch (shape) {
    case ShapeButtonEnum.Circle:
      return shapeButtonClassName.CIRCLE;
    case ShapeButtonEnum.Round:
      return shapeButtonClassName.ROUND;
    case ShapeButtonEnum.RoundPill:
      return shapeButtonClassName.ROUND_PILL;
    default:
      return shapeButtonClassName.SQUARE;
  }
};

const sizeBuilder = (size: string | undefined) => {
  const sizeButtonClassName = ButtonConstants.SIZE_BUTTON_CLASS;
  switch (size) {
    case SizeButtonEnum.Tiny:
      return sizeButtonClassName.TINY;
    case SizeButtonEnum.Small:
      return sizeButtonClassName.SMALL;
    case SizeButtonEnum.Medium:
      return sizeButtonClassName.MEDIUM;
    case SizeButtonEnum.Large:
      return sizeButtonClassName.LARGE;
    default:
      return sizeButtonClassName.MEDIUM;
  }
};

export const ChatRoomButton = (props: IButtonProps) => {
  return props.type === TypeButtonEnum.Link ? (
    <a
      className={`demo-chat-room-button  
      ${colorBuilder(props.type)} 
      ${borderBuilder(props.border)} 
      ${shapeBuilder(props.shape)} 
      ${sizeBuilder(props.size)} 
      ${props.class || ''}
    `}
      onClick={props.onClick}
      href={props.href}
    >
      {props.text}
    </a>
  ) : (
    <button
      id={props.id}
      className={`demo-chat-room-button 
        ${colorBuilder(props.type)} 
        ${borderBuilder(props.border)} 
        ${shapeBuilder(props.shape)} 
        ${sizeBuilder(props.size)} 
        ${props.class || ''}
      `}
      disabled={props.disabled || props.isLoading || false}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
