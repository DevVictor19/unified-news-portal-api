import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpExceptionBody,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { ApplicationError } from '@/common/application/errors/application-errors';

@Catch(ApplicationError)
export class ApplicationErrorsFilter implements ExceptionFilter {
  catch(exception: ApplicationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const errorResponse: HttpExceptionBody = {
      statusCode: exception.httpStatus,
      message: exception.message,
      error: exception.error,
    };

    response.status(exception.httpStatus).send(errorResponse);
  }
}
