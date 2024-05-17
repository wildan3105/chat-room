import { ErrorType } from './enum';
import { MESSAGE } from './constants';
import { ResponseError } from './response-error';

export class NotFoundError extends ResponseError {
  constructor(message = MESSAGE.NOT_FOUND) {
    super(ErrorType.NOT_FOUND, message);
  }
}
