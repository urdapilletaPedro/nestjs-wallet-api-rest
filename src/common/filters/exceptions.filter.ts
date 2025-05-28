import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLogger } from '../logger/logger.service'; // Ajustá el path según tu estructura

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const isDev = process.env.NODE_ENV !== 'prod';

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.extractMessage(exception);

    const errorResponse: Record<string, any> = {
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    if (isDev) {
      errorResponse.stack = (exception as any)?.stack;
    }

    this.logger.error(
      `[${request.method}] ${request.url} → ${status} - ${message}`,
      (exception as any)?.stack,
    );

    response.status(status).json(errorResponse);
  }

  private extractMessage(exception: unknown) {
    if (exception instanceof HttpException) {
      const res = exception.getResponse();

      if (typeof res === 'string') return res;

      if (typeof res === 'object' && res !== null && 'message' in res) {
        const { message } = res as any;
        return Array.isArray(message) ? message.join(', ') : message;
      }
    }

    if ((exception as any)?.message) {
      return (exception as any).message;
    }

    return 'Internal server error';
  }
}
