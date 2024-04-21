import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UnverifiedException } from '@auth/exceptions/unverified.exception';

@Catch(UnverifiedException)
export class UnverifiedExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // response.redirect('/auth/verify-email');
    response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
    });
  }
}
