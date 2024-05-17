import { ResponseSuccess } from './response-success';
import { StatusCode, ResponseStatus } from './enum';
import { MESSAGE } from './constants';

export class NoContentResponse extends ResponseSuccess {
  constructor(message = MESSAGE.NO_CONTENT) {
    super(StatusCode.FAILURE, ResponseStatus.NO_CONTENT, message);
  }
}
