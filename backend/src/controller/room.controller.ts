import { Request, Response } from 'express';

import {
  AsyncFunction,
  BadRequestError,
  BadRequestResponse,
  crudBase,
  SuccessResponse,
} from '../helper';
import { authentication } from '../middlewares';
import { messages, ModelName } from '../utilities';
import { roomService } from '../services';

const getConversation = AsyncFunction(async (req: Request, res: Response) => {
  try {
    const payload = authentication.getPayload(res);
    const pagination = crudBase.getPagination(req);

    const result = await roomService.getConversation(payload.roomId, {
      ...pagination,
    });

    return new SuccessResponse('', result).send(res);
  } catch (error: any) {
    throw new BadRequestResponse().send(error.message);
  }
});

const submitMessage = AsyncFunction(async (req: Request, res: Response) => {
  try {
    const payload = authentication.getPayload(res);

    const savedMessage = await roomService.saveMessage(
      req.body,
      payload.roomId,
      payload.userId,
    );

    return new SuccessResponse(
      messages.modelSavedSuccessfully(ModelName.message),
      savedMessage,
    ).send(res);
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
});

export const roomController = {
  getConversation,
  submitMessage,
};
