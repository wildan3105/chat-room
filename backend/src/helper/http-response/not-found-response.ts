import { Response } from 'express';

import { ResponseSuccess } from './response-success';
import { ResponseStatus, StatusCode } from './enum';
import { MESSAGE } from './constants';

export class NotFoundResponse extends ResponseSuccess {
  constructor(message = MESSAGE.NOT_FOUND) {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }

  send(res: Response): Response {
    return super.prepare<NotFoundResponse>(res, this);
  }
}
