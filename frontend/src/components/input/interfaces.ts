import { ValueTypeInputType, TypeInputType } from './type';

export interface IInputProps {
  id?: string;
  type?: TypeInputType;
  valueType?: ValueTypeInputType;
  class?: string;
  text?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  requiredMessage?: string;
  isLoading?: boolean;
  showAsterisk?: boolean;

  onChange?: (e: any, invalid?: boolean) => void;
  onKeyDown?: (e: any) => void;
}
