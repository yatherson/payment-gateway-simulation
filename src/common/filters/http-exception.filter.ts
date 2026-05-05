import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from '../../domain/exceptions/domain.exception';

interface ProblemDetail {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const detail =
      exception instanceof HttpException
        ? this.extractDetail(exception)
        : 'Ocorreu um erro interno no servidor.';

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception);
    }

    const body: ProblemDetail = {
      type:
        exception instanceof DomainException
          ? exception.errorType
          : `https://httpstatuses.com/${status}`,
      title:
        exception instanceof DomainException
          ? exception.problemTitle
          : this.resolveTitle(status),
      status,
      detail,
      instance: request.url,
    };

    response.status(status).json(body);
  }

  private extractDetail(exception: HttpException): string {
    const payload = exception.getResponse();

    if (typeof payload === 'string') {
      return payload;
    }

    if (typeof payload === 'object' && payload !== null && 'message' in payload) {
      const { message } = payload as { message: string | string[] };
      return Array.isArray(message) ? message.join('; ') : message;
    }

    return exception.message;
  }

  private resolveTitle(status: number): string {
    const titles: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      500: 'Internal Server Error',
    };
    return titles[status] ?? 'Error';
  }
}
