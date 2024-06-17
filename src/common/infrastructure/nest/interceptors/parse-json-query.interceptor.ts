import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { InvalidJsonQueryError } from '@/common/application/errors/application-errors';

@Injectable()
export class ParseJsonQueryInterceptor implements NestInterceptor {
  constructor(private field: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const jsonPayload: string | undefined = request.query[this.field];

    if (!jsonPayload) {
      return next.handle();
    }

    try {
      const parsedJson = JSON.parse(jsonPayload);
      request.query[this.field] = parsedJson;

      return next.handle();
    } catch {
      throw new InvalidJsonQueryError();
    }
  }
}
