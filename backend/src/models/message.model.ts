import { model, Schema, SchemaTypes } from 'mongoose';

import { COLLATION_LOCALE } from '../config';
import { MessageDto } from '../dto';
import { modelSchema } from '../helper';
import { EntityName, ModelName } from '../utilities';
import { baseSchema } from '../models';

const messageSchema: Schema = new Schema(
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
    user_id: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: ModelName.user,
    },
    message: { type: String, required: true },
    ...baseSchema,
  },
  {
    timestamps: {
      createdAt: 'created_date',
      updatedAt: 'updated_date',
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

export const MessageModel = model<MessageDto>(
  ModelName.message,
  messageSchema,
  EntityName.message,
);
