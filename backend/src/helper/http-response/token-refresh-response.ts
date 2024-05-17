import { Response } from 'express';

import { ResponseSuccess } from './response-success';
import { ResponseStatus, StatusCode } from './enum';

export class TokenRefreshResponse extends ResponseSuccess {
  constructor(
    message: string,
    private accessToken: string,
    private refreshToken: string,
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<TokenRefreshResponse>(res, this);
  }
}
