import { ResponseError } from './response-error';
import { MESSAGE } from './constants';
import { ErrorType } from './enum';

export class NoDataError extends ResponseError {
  constructor(message = MESSAGE.NO_DATA_AVAILABLE) {
    super(ErrorType.NO_DATA, message);
  }
}
