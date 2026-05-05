import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class DomainException extends HttpException {
  constructor(
    readonly errorType: string,
    readonly problemTitle: string,
    message: string,
    status: HttpStatus,
  ) {
    super(message, status);
  }
}
