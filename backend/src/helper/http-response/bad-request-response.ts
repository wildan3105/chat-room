import { ResponseSuccess } from './response-success';
import { StatusCode, ResponseStatus } from './enum';
import { MESSAGE } from './constants';

export class BadRequestResponse extends ResponseSuccess {
  constructor(message = MESSAGE.BAD_PARAMETERS) {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}
