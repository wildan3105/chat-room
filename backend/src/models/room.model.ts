import { model, Schema, SchemaTypes } from 'mongoose';

import { COLLATION_LOCALE } from '../config';
import { RoomDto } from '../dto';
import { modelSchema } from '../helper';
import { EntityName, ModelName } from '../utilities';
import { baseSchema } from '../models';

const roomSchema: Schema = new Schema(
  {
    _id: {
      type: SchemaTypes.ObjectId,
      required: false,
      auto: true,
      get: modelSchema.convertObjectIdToString,
    },
    code: { type: String, required: true },
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

export const RoomModel = model<RoomDto>(
  ModelName.room,
  roomSchema,
  EntityName.room,
);
