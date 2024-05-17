import { BaseDto } from '../dto';

export interface UserDto extends BaseDto {
  id: string;
  room_id: string;
  username: string;
  status: UserStatusType;
}
