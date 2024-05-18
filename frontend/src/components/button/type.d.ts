import {
  TypeButtonEnum,
  BorderButtonEnum,
  TextEffectsButtonEnum,
  ShapeButtonEnum,
  SizeButtonEnum,
  PositionButtonEnum,
} from '.';

export type TypeButtonType = typeof TypeButtonEnum[keyof typeof TypeButtonEnum];
export type BorderButtonType = typeof BorderButtonEnum[keyof typeof BorderButtonEnum];
export type TextEffectsButtonType = typeof TextEffectsButtonEnum[keyof typeof TextEffectsButtonEnum];
export type ShapeButtonType = typeof ShapeButtonEnum[keyof typeof ShapeButtonEnum];
export type SizeButtonType = typeof SizeButtonEnum[keyof typeof SizeButtonEnum];
export type PositionButtonType = typeof PositionButtonEnum[keyof typeof PositionButtonEnum];
