import { Response } from 'express';

import { ResponseSuccess } from './response-success';
import { ResponseStatus, StatusCode } from './enum';

export class SuccessResponse<T> extends ResponseSuccess {
  constructor(message: string, private data: T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, this);
  }
}
