import { ResponseSuccess } from './response-success';
import { ResponseStatus, StatusCode } from './enum';

export class FailureMsgResponse extends ResponseSuccess {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
  }
}
