import { ReactNode } from 'react';

import {
  BorderButtonType,
  TextEffectsButtonType,
  ShapeButtonType,
  SizeButtonType,
  PositionButtonType,
  TypeButtonType,
} from './type';

export interface IButtonProps {
  id?: string;
  type?: TypeButtonType;
  class?: string;
  border?: BorderButtonType;
  text?: string;
  textEffects?: TextEffectsButtonType;
  icon?: ReactNode;
  iconColor?: string;
  href?: string;
  tooltip?: string;
  shape?: ShapeButtonType;
  disabled?: boolean;
  size?: SizeButtonType;
  loading?: boolean;
  position?: PositionButtonType;
  isLoading?: boolean;

  onClick?: (event: any) => void;
}
