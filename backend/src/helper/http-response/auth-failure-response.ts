import { ResponseSuccess } from './response-success';
import { StatusCode, ResponseStatus } from './enum';
import { MESSAGE } from './constants';

export class AuthFailureResponse extends ResponseSuccess {
  constructor(message = MESSAGE.AUTHENTICATION_FAILURE) {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }
}
