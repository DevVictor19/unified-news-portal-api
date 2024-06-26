import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import {
  BadRequestError,
  InvalidTokenError,
  InvalidTokenTypeError,
} from '@/common/application/errors/application-errors';
import { TOKEN_TYPE } from '@/common/domain/enums/token-type.enum';
import { AuthJwtParsed } from '@/modules/common/jwt/application/@types/jwt';
import { IJwtProvider } from '@/modules/common/jwt/application/providers/jwt-provider.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtProvider: IJwtProvider) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new BadRequestError();
    }

    const payload = this.jwtProvider.verify<AuthJwtParsed>(token);

    if (!payload || typeof payload === 'string') {
      throw new InvalidTokenError();
    }

    if (payload.token_type !== TOKEN_TYPE.AUTH) {
      throw new InvalidTokenTypeError();
    }

    request.user = payload;

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
