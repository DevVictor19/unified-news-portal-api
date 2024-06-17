import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { InvalidSearchJsonError } from '@/common/application/errors/application-errors';

@Injectable()
export class ParseSearchQueryInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const searchJson: string | undefined = request.query.search;

    if (!searchJson) {
      return next.handle();
    }

    try {
      const parsedJson = JSON.parse(searchJson);
      request.query.search = parsedJson;

      return next.handle();
    } catch {
      throw new InvalidSearchJsonError();
    }
  }
}
