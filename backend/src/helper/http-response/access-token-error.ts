import { ResponseError } from './response-error';
import { MESSAGE } from './constants';
import { ErrorType } from './enum';

export class AccessTokenError extends ResponseError {
  constructor(message = MESSAGE.INVALID_ACCESS_TOKEN) {
    super(ErrorType.ACCESS_TOKEN, message);
  }
}
