import { Response } from 'express';

import { ResponseSuccess } from './response-success';
import { MESSAGE } from './constants';
import { ResponseStatus, StatusCode } from './enum';

export class AccessTokenErrorResponse extends ResponseSuccess {
  private instruction = 'refresh_token';

  constructor(message = MESSAGE.ACCESS_TOKEN_INVALID) {
    super(
      StatusCode.INVALID_ACCESS_TOKEN,
      ResponseStatus.UNAUTHORIZED,
      message,
    );
  }

  send(res: Response): Response {
    res.setHeader('instruction', this.instruction);
    return super.prepare<AccessTokenErrorResponse>(res, this);
  }
}
