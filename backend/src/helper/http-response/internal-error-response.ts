import { ResponseSuccess } from './response-success';
import { ResponseStatus, StatusCode } from './enum';
import { MESSAGE } from './constants';

export class InternalErrorResponse extends ResponseSuccess {
  constructor(message = MESSAGE.INTERNAL_ERROR) {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}
