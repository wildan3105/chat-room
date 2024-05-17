import { Response } from 'express';
import { StatusCode, ResponseStatus } from './enum';

export abstract class ResponseSuccess {
  constructor(
    protected statusCode: StatusCode,
    protected status: ResponseStatus,
    protected message: string,
  ) {}

  protected prepare<T extends ResponseSuccess>(
    res: Response,
    response: T,
  ): Response {
    return res.status(this.status).json(ResponseSuccess.sanitize(response));
  }

  public send(res: Response): Response {
    return this.prepare<ResponseSuccess>(res, this);
  }

  private static sanitize<T extends ResponseSuccess>(response: T): T {
    // tslint:disable-next-line:no-object-literal-type-assertion
    const clone: T = {} as T;
    Object.assign(clone, response);
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }
}
