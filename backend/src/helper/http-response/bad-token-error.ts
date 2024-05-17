import { ResponseError } from './response-error';
import { MESSAGE } from './constants';
import { ErrorType } from './enum';

export class BadTokenError extends ResponseError {
  constructor(message = MESSAGE.TOKEN_NOT_VALID) {
    super(ErrorType.BAD_TOKEN, message);
  }
}
