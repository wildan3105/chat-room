import { Document } from 'mongoose';

export interface BaseDto extends Document {
  create_date: Date;
  update_date: Date;
  is_delete: boolean;
}
