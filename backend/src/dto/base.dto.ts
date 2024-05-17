import { Document } from 'mongoose';

export interface BaseDto extends Document {
  created_date: Date;
  updated_date: Date;
  is_delete: boolean;
}
