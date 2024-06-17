import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { InvalidSearchJsonError } from '@/common/application/errors/application-errors';

@Injectable()
export class ParseOrderQueryInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const orderJson: string | undefined = request.query.order;

    if (!orderJson) {
      return next.handle();
    }

    try {
      const parsedJson = JSON.parse(orderJson);
      request.query.order = parsedJson;

      return next.handle();
    } catch {
      throw new InvalidSearchJsonError();
    }
  }
}
