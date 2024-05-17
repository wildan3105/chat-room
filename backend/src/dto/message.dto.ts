import { BaseDto } from '../dto';

export interface MessageDto extends BaseDto {
  id: string;
  room_id: string;
  user_id: string;
}
