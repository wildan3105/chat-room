import { Request, Response } from 'express';
import { Types } from 'mongoose';

import {
  AsyncFunction,
  BadRequestError,
  BadTokenError,
  SuccessResponse,
} from '../helper';
import { RoomModel, UserModel } from '../models';
import { UserStatusEnum } from '../utilities';
import { authentication } from '../middlewares';

const logout = AsyncFunction(async (req: Request, res: Response) => {
  try {
    const payload = authentication.getPayload(res);

    await UserModel.update(
      { _id: payload.userId },
      {
        status: UserStatusEnum.OFFLINE,
      },
    );

    return new SuccessResponse('Successfully logout.', null).send(res);
  } catch (error: any) {
    throw new BadTokenError(error.message);
  }
});

const login = AsyncFunction(async (req: Request, res: Response) => {
  try {
    const { username, room_id } = req.body;

    const room = await RoomModel.findOne({
      code: room_id,
    });

    const savedRoom = room || (await new RoomModel({ code: room_id }).save());

    const user =
      room &&
      (await UserModel.findOne({
        username,
        room_id: room._id,
      }));

    if (user && user.status === UserStatusEnum.ONLINE) {
      throw new BadRequestError('The username is currently inside the room.');
    }

    const savedUser = !user
      ? await new UserModel({
          username,
          room_id: Types.ObjectId(savedRoom._id),
        }).save()
      : await UserModel.update(
          { _id: user.id },
          {
            status: UserStatusEnum.ONLINE,
          },
        );

    const token = authentication.createToken(
      savedUser.id || user?.id,
      savedRoom.id,
    );

    const auth = {
      roomId: savedRoom.code,
      username: savedUser.username || user?.username,
    };

    return new SuccessResponse('Successfully login.', { token, auth }).send(
      res,
    );
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
});

const validateToken = AsyncFunction(async (req: Request, res: Response) => {
  try {
    const payload = authentication.getPayload(res);

    if (payload) {
      const newToken = authentication.createToken(
        payload.userId,
        payload.roomId,
      );

      const [user, room] = await Promise.all([
        UserModel.findById(payload.userId),
        RoomModel.findById(payload.roomId),
      ]);

      const auth = {
        username: user?.username,
        roomId: room?.code,
      };

      return new SuccessResponse('', { token: newToken, auth }).send(res);
    }

    throw new BadTokenError();
  } catch (error: any) {
    throw new BadTokenError(error.message);
  }
});

export const authController = {
  login,
  logout,
  validateToken,
};
