import { model, Schema, SchemaTypes } from 'mongoose';

import { COLLATION_LOCALE } from '../config';
import { UserDto } from '../dto';
import { modelSchema } from '../helper';
import { EntityName, ModelName, UserStatusEnum } from '../utilities';
import { baseSchema } from '../models';

const userSchema: Schema = new Schema(
  {
    _id: {
      type: SchemaTypes.ObjectId,
      required: false,
      auto: true,
      get: modelSchema.convertObjectIdToString,
    },
    room_id: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: ModelName.room,
    },
    username: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(UserStatusEnum),
      default: UserStatusEnum.ONLINE,
      required: false,
    },
    ...baseSchema,
  },
  {
    timestamps: {
      createdAt: 'create_date',
      updatedAt: 'update_date',
    },
    collation: {
      locale: COLLATION_LOCALE,
      strength: 1,
    },
    toJSON: {
      getters: true,
      transform: modelSchema.transformObject,
    },
  },
);

export const UserModel = model<UserDto>(
  ModelName.user,
  userSchema,
  EntityName.user,
);
