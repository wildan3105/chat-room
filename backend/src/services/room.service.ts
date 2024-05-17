import { Types } from 'mongoose';

import { MessageModel, RoomModel, UserModel } from '../models';
import { PaginationInterface } from '../utilities';
import { modelSchema } from '../helper';

const getConversationFromRealTime = async (roomCode: string) => {
  const room = await RoomModel.findOne({
    code: { $eq: roomCode },
  });

  if (room) {
    return getConversation(modelSchema.convertObjectIdToString(room.id));
  }

  return [];
};

const getConversation = async (
  roomId: string,
  options?: {
    pageSize?: number;
    currentPage?: number;
    skip?: number;
    limit?: number;
  },
) => {
  const pageSize = options?.pageSize || 10;
  const currentPage = options?.currentPage || 1;
  const limit = currentPage * pageSize;
  const skip = (currentPage - 1) * pageSize;

  const filterQuery: any = {
    room_id: {
      $in: [roomId],
    },
  };

  const message = await MessageModel.find(filterQuery)
    .populate('user_id', '_id username')
    .select('_id message created_date')
    .sort({ created_date: -1 })
    .limit(limit)
    .skip(skip);

  const total = await MessageModel.countDocuments(filterQuery);

  const result: PaginationInterface = {
    record: message,
    currentPage,
    pageSize,
    total,
  };

  return result;
};

const savedMessageFromRealTime = async (data: {
  message: string;
  username: string;
  roomId: string;
}) => {
  const room = await RoomModel.findOne({
    code: { $eq: data.roomId },
  });

  const user = await UserModel.findOne({
    username: {
      $eq: data.username,
    },
    room_id: {
      $in: [room?.id],
    },
  });

  if (room && user) {
    return saveMessage(
      { message: data.message },
      modelSchema.convertObjectIdToString(room.id),
      modelSchema.convertObjectIdToString(user.id),
    );
  }

  return null;
};

const saveMessage = (data: any, roomId: string, userId: string) => {
  return new MessageModel({
    ...data,
    room_id: Types.ObjectId(roomId),
    user_id: Types.ObjectId(userId),
  }).save();
};

export const roomService = {
  getConversationFromRealTime,
  savedMessageFromRealTime,
  getConversation,
  saveMessage,
};
