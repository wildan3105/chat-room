import { ResponseSuccess } from './response-success';
import { ResponseStatus, StatusCode } from './enum';
import { MESSAGE } from './constants';

export class ForbiddenResponse extends ResponseSuccess {
  constructor(message = MESSAGE.FORBIDDEN) {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}
