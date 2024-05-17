import { ResponseSuccess } from './response-success';
import { ResponseStatus, StatusCode } from './enum';

export class SuccessMsgResponse extends ResponseSuccess {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}
